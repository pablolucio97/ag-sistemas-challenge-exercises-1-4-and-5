import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ProductDTO, UpdateProductDTO } from 'src/domain/DTOs/productsDTO';
import { UpdateProductUseCase } from 'src/domain/useCases/products/updateProductUseCase';

interface ControllerResponse {
  STATUS: number;
  RES: ProductDTO | null;
}

@Controller('/produtos')
export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async handle(
    @Param('id') id: string,
    @Body() body: UpdateProductDTO,
  ): Promise<ControllerResponse> {
    try {
      const updatedProduct = await this.updateProductUseCase.execute({
        ...body,
        id: parseInt(id),
      });
      return {
        STATUS: HttpStatus.OK,
        RES: updatedProduct,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);

      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Houve um erro ao atualizar o produto. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }
}
