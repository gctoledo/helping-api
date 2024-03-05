import { PostgresCreateUserRepository } from "../repositories/postgres/create-user";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { CreateUserParamsProps, User } from "../types/user";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email";
import { EmailIsAlreadyInUse } from "../errors/user";

export class CreateUserUseCase {
  async execute(userParams: CreateUserParamsProps) {
    const postgresGetUserByEmailRepository =
      await new PostgresGetUserByEmailRepository();
    const providedEmail = await postgresGetUserByEmailRepository.execute(
      userParams.email
    );

    if (providedEmail) {
      throw new EmailIsAlreadyInUse(userParams.email);
    }

    const userId = uuidv4();

    const hashedPassword: string = await bcrypt.hash(userParams.password, 10);

    const user: User = { ...userParams, id: userId, password: hashedPassword };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
