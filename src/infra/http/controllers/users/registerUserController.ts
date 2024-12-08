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
import { CreateUserDTO, UserDTO } from 'src/domain/DTOs/usersDTO';
import { RegisterUserUseCase } from 'src/domain/useCases/users/registerUserUseCase';
import { z } from 'zod';

const createUserValidationSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

interface ControllerResponse {
  STATUS: number;
  RES: UserDTO | null;
}

@Controller('/auth/register')
export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateUserDTO): Promise<ControllerResponse> {
    const isBodyValidated = createUserValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException(
        'Cheque se todos os campos foram preenchidos corretamente.',
      );
    }

    try {
      const newUser = await this.registerUserUseCase.execute(body);

      return {
        STATUS: HttpStatus.CREATED,
        RES: newUser,
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
            'Houve um erro ao cadastrar usuário. Por favor, tente novamente mais tarde,',
          error: error.message,
        });
      }
    }
  }
}
