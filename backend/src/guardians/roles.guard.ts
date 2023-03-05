import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Dependencies(Reflector, JwtService, ConfigService)
export class RolesGuard {
  constructor( private reflector: Reflector,
    private jwt: JwtService,
    private configService: ConfigService
  ) {
  }

  canActivate(context: ExecutionContext):  boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization ?
      request.headers.authorization.split(' ')[1] : ''

    const jwtConfig = this.configService.get('jwt.secret')
    const user = this.jwt.verify(token, {
      secret: jwtConfig
    })
    return requiredRoles.some((role) => user.role === role)
  }
}