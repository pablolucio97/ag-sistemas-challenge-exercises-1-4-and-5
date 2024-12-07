import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDTO } from '../../DTOs/productsDTO';
import { ProductsService } from '../../services/product.service';

@Injectable()
export class UpdateProductUseCase {
  constructor(private productsService: ProductsService) {}
  async execute(data: UpdateProductDTO) {
    const product = await this.productsService.checkIfProductWasFound(data.id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.productsService.validateProduct(data);

    if (data.nome) {
      const productAlreadyExists =
        await this.productsService.checkIfProductAlreadyExists(data.nome);
      if (productAlreadyExists) {
        throw new ConflictException(
          'Já existe um produto cadastrado com este nome.',
        );
      }
    }

    const updatedProduct = await this.productsService.updateProduct(data);
    return updatedProduct;
  }
}
