import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './infra/modules/auth.module';
import { ProductsModule } from './infra/modules/products.module';
import { UsersModule } from './infra/modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
