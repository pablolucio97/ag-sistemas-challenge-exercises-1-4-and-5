import { Module } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';
import { GetUserUseCase } from 'src/domain/useCases/users/getUserUseCase';
import { RegisterUserUseCase } from 'src/domain/useCases/users/registerUserUseCase';
import { PrismaService } from 'src/service/prisma';
import { GetUserController } from '../http/controllers/users/getUserController';
import { RegisterUserController } from '../http/controllers/users/registerUserController';

@Module({
  providers: [PrismaService, UsersService, RegisterUserUseCase, GetUserUseCase],
  controllers: [RegisterUserController, GetUserController],
})
export class UsersModule {}
