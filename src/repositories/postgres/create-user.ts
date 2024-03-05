import { PostgresHelper } from "../../db/postgres/helpers";
import { User } from "../../types/user";

export class PostgresCreateUserRepository {
  async execute(userParams: User): Promise<User> {
    const createdUser: User[] = await PostgresHelper.query(
      "INSERT INTO users(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        userParams.id,
        userParams.first_name,
        userParams.last_name,
        userParams.email,
        userParams.password,
      ]
    );

    return createdUser[0];
  }
}
