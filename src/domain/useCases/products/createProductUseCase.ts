import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../../DTOs/productsDTO';
import { ProductsService } from '../../services/product.service';

@Injectable()
export class CreateProductUseCase {
  constructor(private productsService: ProductsService) {}
  async execute(data: CreateProductDTO) {
    const productAlreadyExists =
      await this.productsService.checkIfProductAlreadyExists(data.nome);
    if (productAlreadyExists) {
      throw new ConflictException(
        'Já existe um produto cadastrado com este nome.',
      );
    }

    const newProduct = await this.productsService.createProduct(data);
    return newProduct;
  }
}
