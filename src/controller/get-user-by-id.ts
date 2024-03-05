import { Request } from "express";
import validator from "validator";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id";
import { ControllerReturnTypes } from "./types/controller-return-types";

export class GetUserByIdController {
  async execute(httpRequest: Request): Promise<ControllerReturnTypes> {
    try {
      const userId = httpRequest.params.userId;

      const idIsValid = validator.isUUID(userId);

      if (!idIsValid) {
        return {
          statusCode: 400,
          body: {
            message: "The provided id is not valid.",
          },
        };
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

      return { statusCode: 200, body: user };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
