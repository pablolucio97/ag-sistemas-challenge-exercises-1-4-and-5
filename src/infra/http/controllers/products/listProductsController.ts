import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductDTO } from 'src/domain/DTOs/productsDTO';
import { ListProductsUseCase } from 'src/domain/useCases/products/listProductsUseCase';

interface ControllerResponse {
  STATUS: number;
  RES: ProductDTO[];
}

@Controller('/produtos')
export class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(): Promise<ControllerResponse> {
    try {
      const products = await this.listProductsUseCase.execute();
      return {
        STATUS: HttpStatus.OK,
        RES: products,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Houve um erro ao listar os produtos. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }
}
