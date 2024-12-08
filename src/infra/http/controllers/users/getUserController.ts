import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/domain/DTOs/usersDTO';
import { GetUserUseCase } from 'src/domain/useCases/users/getUserUseCase';

interface ControllerResponse {
  STATUS: number;
  RES: UserDTO | null;
}

@Controller('/auth/profile')
@UseGuards(AuthGuard('jwt-user'))
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      const user = await this.getUserUseCase.execute(parseInt(id));

      return {
        STATUS: HttpStatus.OK,
        RES: user,
      };
    } catch (error) {
      console.log('[INTERNAL ERROR]', error.message);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Houve um erro ao buscar usuário. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }
}
