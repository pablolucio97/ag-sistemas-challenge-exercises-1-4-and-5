import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/service/prisma';
import { CreateUserDTO, UserDTO } from '../DTOs/usersDTO';
import { UsersRepository } from '../repositories/interfaces/usersRepository';

@Injectable()
export class UsersService implements UsersRepository {
  constructor(private prismaService: PrismaService) {}
  async createUser(data: CreateUserDTO): Promise<UserDTO | null> {
    const userAlreadyExists = await this.checkIfUserAlreadyExists(data.email);

    if (userAlreadyExists) {
      return null;
    }

    const SALT_LEVEL = 6;

    const safePassword = await hash(data.senha, SALT_LEVEL);

    const newUser = await this.prismaService.user.create({
      data: {
        email: data.email,
        senha: safePassword,
      },
    });
    return newUser;
  }
  async getUser(userId: number): Promise<UserDTO | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async checkIfUserAlreadyExists(email: string): Promise<boolean> {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      return true;
    }
    return false;
  }
}
