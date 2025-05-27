import { AppError } from "../utils/AppError.js";
import {
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_UNIQUE,
  ERROR_CODE_WRONG_PASSWORD,
  ERROR_CODE_PASSWORD_CONFIRMATION,
  ERROR_CODE_PASSWORD_EMPTY,
} from "../utils/constant/errorCode.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_SERVER_DOWN,
} from "../utils/constant/responseCode.js";
import { deleteFile } from "../utils/fileHandle.js";
import { tryCatch } from "../utils/tryCatch.js";

async function errorHandler(error, req, res, next) {
  // console.log(error);
  //# code Error handel
  if (error.code == ERROR_CODE_UNIQUE) {
    res.status(RESPONSE_CODE_BAD).json({
      errors: {
        email: "this email is already exists",
      },
    });
  }

  //# validation error
  // user validation
  if (error.message.includes("User validation failed")) {
    let errors = {};
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    res.status(RESPONSE_CODE_BAD).json({ errors });
  }
  //user from patch request
  if (error.message.includes("Validation failed")) {
    let errors = {};
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    res.status(RESPONSE_CODE_BAD).json({ errors });
  }

  if (error._message.includes("Item validation failed")) {
    deleteFile(req);
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

    if (CODE == ERROR_CODE_FORBIDDEN) {
      res.status(error.statusCode).json({ page: "direct me to 403 page" });
    }

    if (CODE == ERROR_CODE_PASSWORD_CONFIRMATION) {
      const error = {
        password: error.message,
      };
      res.status(error.statusCode).json({ error });
    }

    if (CODE == ERROR_CODE_PASSWORD_EMPTY) {
      const error = {
        password: error.message,
      };
      res.status(error.statusCode).json({ error });
    }

    res.status(error.statusCode).json({ errors });
  }

  // res.status(RESPONSE_CODE_SERVER_DOWN).json({ error });
}

export { errorHandler };
