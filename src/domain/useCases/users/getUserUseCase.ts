import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';

@Injectable()
export class GetUserUseCase {
  constructor(private usersService: UsersService) {}
  async execute(userId: number) {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }
}
