import { Module } from '@nestjs/common';
import { ProductsModule } from './infra/modules/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
