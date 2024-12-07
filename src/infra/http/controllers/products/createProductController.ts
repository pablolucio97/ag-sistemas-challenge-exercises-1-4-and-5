import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateProductDTO, ProductDTO } from 'src/domain/DTOs/productsDTO';
import { CreateProductUseCase } from 'src/domain/useCases/products/createProductUseCase';
import { z } from 'zod';

const createProductValidationSchema = z.object({
  nome: z.string(),
  preco: z.number(),
  descricao: z.string(),
});

interface ControllerResponse {
  STATUS: number;
  RES: ProductDTO | null;
}

@Controller('/produtos')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateProductDTO): Promise<ControllerResponse> {
    const isBodyValidated = createProductValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException(
        'Cheque se todos os campos foram preenchidos corretamente.',
      );
    }

    try {
      const newProduct = await this.createProductUseCase.execute(body);
      return {
        STATUS: HttpStatus.CREATED,
        RES: newProduct,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);
      if (error.status && error.status === HttpStatus.CONFLICT) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: error.message,
          error: error.detail,
        });
      } else if (error.status && error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
          error: error.detail,
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Houve um erro ao cadastrar produto. Por favor, tente novamente mais tarde,',
          error: error.message,
        });
      }
    }
  }
}
