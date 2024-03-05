import { PostgresGetUserByIdRepository } from "../repositories/postgres/get-user-by-id";
import { User } from "../types/user";

export class GetUserByIdUseCase {
  async execute(userId: string): Promise<User> {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const user = await postgresGetUserByIdRepository.execute(userId);

    return user;
  }
}
