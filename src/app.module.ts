import { Module } from '@nestjs/common';
import { ProductsModule } from './infra/modules/products.module';
import { UsersModule } from './infra/modules/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
})
export class AppModule {}
