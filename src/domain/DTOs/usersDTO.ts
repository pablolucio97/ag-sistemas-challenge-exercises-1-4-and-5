export interface UserDTO {
  id: number;
  email: string;
  senha: string;
}

export interface CreateUserDTO {
  email: string;
  senha: string;
}
