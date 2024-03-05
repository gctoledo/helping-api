import { Request } from "express";
import { badRequest, ok, serverError } from "./helpers/http";
import { ControllerReturnTypes } from "./types/controller-return-types";
import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-user";
import { EmailIsAlreadyInUse } from "../errors/user";

export class CreateUserController {
  async execute(httpRequest: Request): Promise<ControllerReturnTypes> {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      const passwordIsValid = params.password.length >= 6;

      if (!passwordIsValid) {
        return badRequest({
          message: "Password must be at least 6 characters.",
        });
      }

      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest({
          message: "Invalid e-mail. Please provide a valid one.",
        });
      }

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return ok(createdUser);
    } catch (err) {
      if (err instanceof EmailIsAlreadyInUse) {
        return badRequest({ message: err.message });
      }

      console.error(err);

      return serverError();
    }
  }
}
