import { AppError } from "../utils/errors/AppError.js";
import { ERROR_CODE_UNIQUE } from "../utils/constant/errorCode.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_SERVER_DOWN,
} from "../utils/constant/responseCode.js";
import { deleteFileFrom } from "../utils/fileHandle.js";
import { validationError } from "../utils/errors/validationError.js";
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

  if (
    error.message.includes("Validation") ||
    error.message.includes("validation")
  ) {
    validationError.call(error, req, res);
  }

  //#AppErrorHandel
  if (error instanceof AppError) {
    error.validation(res);
  }
  if (!res.headersSent) {
    res.status(RESPONSE_CODE_SERVER_DOWN).json({ error });
  }
}

export { errorHandler };
