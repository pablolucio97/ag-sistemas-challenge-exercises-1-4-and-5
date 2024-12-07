import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from 'src/domain/DTOs/productsDTO';

export interface ProductsRepository {
  createProduct(data: CreateProductDTO): Promise<ProductDTO | null>;
  listProducts(): Promise<ProductDTO[]>;
  getProduct(productId: number): Promise<ProductDTO | null>;
  updateProduct(data: UpdateProductDTO): Promise<ProductDTO | null>;
  deleteProduct(productId: number): Promise<void>;
}
