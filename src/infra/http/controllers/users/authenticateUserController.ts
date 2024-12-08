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
import { AuthenticateUserDTO } from 'src/domain/DTOs/usersDTO';
import { AuthenticateUserUseCase } from 'src/domain/useCases/users/authenticateUserUseCase';
import { z } from 'zod';

const createUserValidationSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

interface ControllerResponse {
  STATUS: number;
  RES: string | null;
}

@Controller('/auth/login')
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: AuthenticateUserDTO): Promise<ControllerResponse> {
    const isBodyValidated = createUserValidationSchema.safeParse(body);
    if (!isBodyValidated.success) {
      throw new BadRequestException(
        'Cheque se todos os campos foram preenchidos corretamente.',
      );
    }

    try {
      const token = await this.authenticateUser.execute(body);

      return {
        STATUS: HttpStatus.CREATED,
        RES: token,
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
            'Houve um erro ao autenticar usuário. Por favor, tente novamente mais tarde,',
          error: error.message,
        });
      }
    }
  }
}
