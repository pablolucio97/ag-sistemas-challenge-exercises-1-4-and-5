import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DeleteProductUseCase } from 'src/domain/useCases/products/deleteProductUseCase';

@Controller('/produtos')
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') id: string): Promise<void> {
    try {
      const productId = parseInt(id);

      await this.deleteProductUseCase.execute(productId);
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Houve um erro ao deletar o produto. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }
}
