import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_JWT'
    })
  }

  async validate(payload){
    return { id: payload.id, name: payload.name}
  }
}