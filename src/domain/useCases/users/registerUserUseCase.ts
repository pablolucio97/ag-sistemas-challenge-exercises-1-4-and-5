import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';
import { CreateUserDTO } from '../../DTOs/usersDTO';

@Injectable()
export class RegisterUserUseCase {
  constructor(private usersService: UsersService) {}
  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersService.checkIfUserAlreadyExists(
      data.email,
    );
    if (userAlreadyExists) {
      //exibindo mensagem genérica por questão de segurança, o objetivo aqui é evitar que pessoas mal
      // intencionadas consigam inferir que descobriram um email existente no banco
      throw new ConflictException('Operação não permitida');
    }
    const newUser = await this.usersService.createUser(data);
    return newUser;
  }
}
