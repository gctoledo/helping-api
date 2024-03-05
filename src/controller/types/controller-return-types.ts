import { User } from "../../types/user";

export type BodyParams = User | { message: string };
export interface ControllerReturnTypes {
  statusCode: number;
  body: BodyParams;
}
