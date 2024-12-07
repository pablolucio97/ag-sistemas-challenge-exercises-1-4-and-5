import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/domain/services/product.service';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productsService: ProductsService) {}
  async execute(productId: number) {
    await this.productsService.deleteProduct(productId);
  }
}
