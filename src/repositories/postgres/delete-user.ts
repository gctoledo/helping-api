import { PostgresHelper } from "../../db/postgres/helpers";
import { User } from "../../types/user";

export class PostgresDeleteUserRepository {
  async execute(userId: string): Promise<User> {
    const deletedUser = await PostgresHelper.query(
      "DELETE from users WHERE id = $1 RETURNING *",
      [userId]
    );

    return deletedUser[0];
  }
}
