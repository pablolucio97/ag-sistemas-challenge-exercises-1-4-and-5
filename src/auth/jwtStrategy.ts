import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TEnvSchema } from 'src/env';
import { z } from 'zod';

const authPayloadSchema = z.object({
  sub: z.string(),
});

type AuthPayloadSchema = z.infer<typeof authPayloadSchema>;

@Injectable()
export class JWTMiddleware extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(public configService: ConfigService<TEnvSchema, true>) {
    const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: AuthPayloadSchema) {
    return authPayloadSchema.parse(payload);
  }
}
