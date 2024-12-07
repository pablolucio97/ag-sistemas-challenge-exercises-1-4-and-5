import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/domain/services/product.service';

@Injectable()
export class GetProductUseCase {
  constructor(private productsService: ProductsService) {}
  async execute(productId: number) {
    const products = await this.productsService.getProduct(productId);
    return products;
  }
}
