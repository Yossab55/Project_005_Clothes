import { AppError } from "../utils/AppError.js";
import {
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_UNIQUE,
  ERROR_CODE_WRONG_PASSWORD,
} from "../utils/constant/errorCode.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_SERVER_DOWN,
} from "../utils/constant/responseCode.js";

function errorHandler(error, req, res, next) {
  console.log(error);
  //# code Error handel
  if (error.code == ERROR_CODE_UNIQUE) {
    res.status(RESPONSE_CODE_BAD).json({
      errors: {
        email: "this email is already exists",
      },
    });
  }
  //# validation error
  if (error.message.includes("User validation failed")) {
    let errors = {};
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    res.status(RESPONSE_CODE_BAD).json({ errors });
  }
  //#AppErrorHandel
  if (error instanceof AppError) {
    let errors = {};
    const CODE = error.errorCode;
    if (CODE == ERROR_CODE_EMAIL_NOT_FOUND) {
      errors["email"] = error.message;
    }

    if (CODE == ERROR_CODE_WRONG_PASSWORD) {
      errors["password"] = error.message;
    }

    res.status(error.statusCode).json({ errors });
  }
  res.status(RESPONSE_CODE_SERVER_DOWN).json({ error });
}

export { errorHandler };
