import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/domain/services/product.service';

@Injectable()
export class ListProductsUseCase {
  constructor(private productsService: ProductsService) {}
  async execute() {
    const products = await this.productsService.listProducts();
    return products;
  }
}
