import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import {
  ERROR_CODE_PASSWORD_CONFIRMATION,
  ERROR_CODE_PASSWORD_EMPTY,
} from "../utils/constant/errorCode.js";
import { RESPONSE_CODE_BAD } from "../utils/constant/responseCode.js";

async function passwordConfirmation(req, res, next) {
  const password = req.passwordConfirmation;
  if (password) {
    const check = bcrypt.compare(password, req.user.password);
    if (check) {
      next();
    } else {
      throw new AppError(
        ERROR_CODE_PASSWORD_CONFIRMATION,
        "your password is wrong, please write it again",
        RESPONSE_CODE_BAD
      );
    }
  } else {
    throw new AppError(
      ERROR_CODE_PASSWORD_EMPTY,
      "your password is required",
      RESPONSE_CODE_BAD
    );
  }
  next();
}

export { passwordConfirmation };
