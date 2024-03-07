import {
  BodyParams,
  ControllerReturnTypes,
} from "../types/controller-return-types";

export const serverError = (): ControllerReturnTypes => ({
  statusCode: 500,
  body: {
    message: "Internal server error",
  },
});

export const badRequest = (body: BodyParams): ControllerReturnTypes => ({
  statusCode: 400,
  body,
});

export const ok = (body: BodyParams): ControllerReturnTypes => ({
  statusCode: 200,
  body,
});
