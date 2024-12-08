import { Module } from '@nestjs/common';
import { UsersService } from 'src/domain/services/user.service';
import { AuthenticateUserUseCase } from 'src/domain/useCases/users/authenticateUserUseCase';
import { GetUserUseCase } from 'src/domain/useCases/users/getUserUseCase';
import { RegisterUserUseCase } from 'src/domain/useCases/users/registerUserUseCase';
import { PrismaService } from 'src/service/prisma';
import { AuthenticateUserController } from '../http/controllers/users/authenticateUserController';
import { GetUserController } from '../http/controllers/users/getUserController';
import { RegisterUserController } from '../http/controllers/users/registerUserController';

@Module({
  providers: [
    PrismaService,
    UsersService,
    RegisterUserUseCase,
    GetUserUseCase,
    AuthenticateUserUseCase,
  ],
  controllers: [
    RegisterUserController,
    GetUserController,
    AuthenticateUserController,
  ],
})
export class UsersModule {}
