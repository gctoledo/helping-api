import { User } from "../../types/user";

export interface ControllerReturnTypes {
  statusCode: number;
  body:
    | User
    | {
        message: string;
      };
}
