import { PostgresDeleteUserRepository } from "../repositories/postgres/delete-user";
import { User } from "../types/user";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<User> {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

    const deletedUser = await postgresDeleteUserRepository.execute(userId);

    return deletedUser;
  }
}
