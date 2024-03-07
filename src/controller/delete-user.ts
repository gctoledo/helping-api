import { DeleteUserUseCase } from "../use-cases/delete-user";
import validator from "validator";
import { Request } from "express";
import { badRequest, ok, serverError } from "./helpers/http";
import { ControllerReturnTypes } from "./types/controller-return-types";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id";

export class DeleteUserController {
  async execute(httpRequest: Request): Promise<ControllerReturnTypes> {
    try {
      const userId = httpRequest.params.userId;

      const idIsValid = validator.isUUID(userId);

      if (!idIsValid) {
        return badRequest({
          message: "The provided id is not valid.",
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(userId);

      if (!user) {
        return {
          statusCode: 404,
          body: {
            message: "User not found",
          },
        };
      }

      const deleteUserUseCase = new DeleteUserUseCase();

      const deletedUser = await deleteUserUseCase.execute(userId);

      return ok(deletedUser);
    } catch (err) {
      console.error(err);

      return serverError();
    }
  }
}
