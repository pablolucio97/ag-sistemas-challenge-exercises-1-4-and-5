import { Module } from '@nestjs/common';
import { ProductsService } from 'src/domain/services/product.service';
import { CreateProductUseCase } from 'src/domain/useCases/products/createProductUseCase';
import { DeleteProductUseCase } from 'src/domain/useCases/products/deleteProductUseCase';
import { GetProductUseCase } from 'src/domain/useCases/products/getProductsUseCase';
import { ListProductsUseCase } from 'src/domain/useCases/products/listProductsUseCase';
import { UpdateProductUseCase } from 'src/domain/useCases/products/updateProductUseCase';
import { PrismaService } from 'src/service/prisma';
import { CreateProductController } from '../http/controllers/products/createProductController';
import { DeleteProductController } from '../http/controllers/products/deleteProductController';
import { GetProductController } from '../http/controllers/products/getProductController';
import { ListProductsController } from '../http/controllers/products/listProductsController';
import { UpdateProductController } from '../http/controllers/products/updateProductController';

@Module({
  providers: [
    PrismaService,
    ProductsService,
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  controllers: [
    CreateProductController,
    ListProductsController,
    UpdateProductController,
    GetProductController,
    DeleteProductController,
  ],
})
export class ProductsModule {}
