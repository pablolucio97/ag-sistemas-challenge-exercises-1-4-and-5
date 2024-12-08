import { ConflictException, Injectable } from '@nestjs/common';
import { AuthenticateUserDTO } from 'src/domain/DTOs/usersDTO';
import { UsersService } from 'src/domain/services/user.service';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private usersService: UsersService) {}
  async execute(data: AuthenticateUserDTO) {
    const userExists = await this.usersService.checkIfUserAlreadyExists(
      data.email,
    );
    const token = await this.usersService.authenticateUser(data);
    if (!userExists || !token) {
      throw new ConflictException('Credenciais incorretas.');
    }
    return token;
  }
}
