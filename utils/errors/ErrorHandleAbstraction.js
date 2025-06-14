import { AppError } from "./AppError.js";
import { ERROR_CODE_UNIQUE } from "../constant/errorCode.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_SERVER_DOWN,
} from "../constant/responseCode.js";
import { ValidationError } from "./validationError.js";
class ErrorHandleAbstraction {
  constructor(error, req, res, next) {
    this.error = error;
    this.req = req;
    this.res = res;
    this.next = next;
  }
  handleError() {
    if (this.errorCodeValidation()) return;
    if (this.validationErrorHandle()) return;
    if (this.appErrorHandle()) return;
    this.serverErrorHandle();
  }
  errorCodeValidation() {
    if (this.error.code == ERROR_CODE_UNIQUE) {
      this.res.status(RESPONSE_CODE_BAD).json({
        errors: {
          email: "this email is already exists",
        },
      });
      return true;
    }
    return false;
  }
  validationErrorHandle() {
    if (
      this.error.message.includes("Validation") ||
      this.error.message.includes("validation")
    ) {
      const validator = new ValidationError(this.error, this.req, this.res);
      validator.validationError();
      // validationError.call(this.error, this.req, this.res);
      return true;
    }
    return false;
  }
  appErrorHandle() {
    if (this.error instanceof AppError) {
      this.error.validation(this.res);
      return true;
    }
    return false;
  }
  serverErrorHandle() {
    if (!this.res.headersSent) {
      const error = this.error;
      this.res.status(RESPONSE_CODE_SERVER_DOWN).json({ error });
    }
  }
}
export { ErrorHandleAbstraction };
