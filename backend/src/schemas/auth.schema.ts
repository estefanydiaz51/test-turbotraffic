
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class Auth {
  @Prop()
  name: string;

  @Prop()
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
export type AuthDocument = HydratedDocument<Auth>;
export type AuthModel = Model<AuthDocument>






