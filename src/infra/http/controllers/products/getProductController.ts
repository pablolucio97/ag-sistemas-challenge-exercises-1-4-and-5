import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ProductDTO } from 'src/domain/DTOs/productsDTO';
import { GetProductUseCase } from 'src/domain/useCases/products/getProductsUseCase';

interface ControllerResponse {
  STATUS: number;
  RES: ProductDTO | null;
}

@Controller('/produtos')
export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      const product = await this.getProductUseCase.execute(parseInt(id));

      return {
        STATUS: HttpStatus.OK,
        RES: product,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Houve um erro ao buscar o produto. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }
}
