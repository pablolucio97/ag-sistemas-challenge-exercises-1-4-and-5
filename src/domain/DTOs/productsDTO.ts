import { Decimal } from '@prisma/client/runtime/library';

export interface ProductDTO {
  id: number;
  nome: string;
  preco: Decimal | number;
  descricao: string;
}

export interface CreateProductDTO {
  nome: string;
  preco: Decimal | number;
  descricao: string;
}

export interface UpdateProductDTO {
  id: number;
  nome?: string;
  preco?: Decimal;
  descricao?: string;
}
