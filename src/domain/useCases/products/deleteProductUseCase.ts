import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/domain/services/product.service';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productsService: ProductsService) {}
  async execute(productId: number) {
    const product =
      await this.productsService.checkIfProductWasFound(productId);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.productsService.deleteProduct(productId);
  }
}
