import { CreateUserDTO, UserDTO } from 'src/domain/DTOs/usersDTO';

export interface UsersRepository {
  createUser(data: CreateUserDTO): Promise<UserDTO | null>;
  getUser(userId: number): Promise<UserDTO | null>;
}
