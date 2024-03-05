import { PostgresHelper } from "../../db/postgres/helpers";
import { User } from "../../types/user";

export class PostgresGetUserByIdRepository {
  async execute(userId: string): Promise<User> {
    const user: User[] = await PostgresHelper.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );

    return user[0];
  }
}
