import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    // debug logging to ensure strategy is invoked and payload parsed
    console.log('JwtStrategy.validate called, payload=', payload);
    // payload contains { sub, phone, email }
    return { id: payload.sub, phone: payload.phone, email: payload.email };
  }
}
