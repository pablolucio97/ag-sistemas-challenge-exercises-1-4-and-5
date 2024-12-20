import { BadRequestException, Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../service/prisma';
import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from '../DTOs/productsDTO';
import { ProductsRepository } from '../repositories/interfaces/productsRepository';

@Injectable()
export class ProductsService implements ProductsRepository {
  constructor(private prismaService: PrismaService) {}
  async createProduct(data: CreateProductDTO): Promise<ProductDTO | null> {
    await this.validateProduct(data);

    const productAlreadyExists = await this.checkIfProductAlreadyExists(
      data.nome,
    );

    if (productAlreadyExists) {
      return null;
    }

    const newProduct = await this.prismaService.produto.create({ data });
    return {
      ...newProduct,
      preco: parseFloat(String(newProduct.preco)),
    };
  }
  async listProducts(): Promise<ProductDTO[]> {
    const rawProducts = await this.prismaService.produto.findMany();
    const products = rawProducts.map((product) => ({
      ...product,
      preco: parseFloat(String(product.preco)),
    }));
    return products;
  }
  async getProduct(productId: number): Promise<ProductDTO | null> {
    const rawProduct = await this.prismaService.produto.findUnique({
      where: {
        id: productId,
      },
    });

    if (!rawProduct) {
      return null;
    }

    const product = {
      ...rawProduct,
      preco: parseFloat(String(rawProduct.preco)),
    };
    return product;
  }
  async updateProduct(data: UpdateProductDTO): Promise<ProductDTO | null> {
    const product = await this.checkIfProductWasFound(data.id);

    if (!product) {
      return null;
    }

    const productAlreadyExists = await this.checkIfProductAlreadyExists(
      data.nome!,
    );

    if (productAlreadyExists) {
      return null;
    }

    const updatedProduct = await this.prismaService.produto.update({
      where: {
        id: data.id,
      },
      data,
    });
    return {
      ...updatedProduct,
      preco: parseFloat(String(updatedProduct.preco)),
    };
  }
  async deleteProduct(productId: number): Promise<void> {
    await this.prismaService.produto.delete({ where: { id: productId } });
  }
  async checkIfProductAlreadyExists(productName: string) {
    const productAlreadyExists = await this.prismaService.produto.findUnique({
      where: {
        nome: productName,
      },
    });
    return productAlreadyExists;
  }
  async checkIfProductWasFound(productId: number) {
    const product = await this.prismaService.produto.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }
  //Exercicio 4
  async validateProduct(data: Partial<CreateProductDTO>): Promise<void> {
    const price =
      typeof data.preco === 'object' && 'toNumber' in data.preco
        ? (data.preco as Decimal).toNumber()
        : data.preco;

    const isProductNameValid = data.nome && data.nome.trim().length > 0;
    const isProductPriceValid = price && price > 0;
    if (!isProductNameValid) {
      throw new BadRequestException('O nome do produto não pode estar vazio.');
    }
    if (!isProductPriceValid) {
      throw new BadRequestException(
        'O preço deve ser um número decimal maior que 0.',
      );
    }
  }
}
