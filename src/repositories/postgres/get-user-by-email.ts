import { PostgresHelper } from "../../db/postgres/helpers";
import { User } from "../../types/user";

export class PostgresGetUserByEmailRepository {
  async execute(email: string): Promise<User> {
    const user: User[] = await PostgresHelper.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    return user[0];
  }
}
