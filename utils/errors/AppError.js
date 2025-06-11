import { mapErrorCode, mapErrorSendPage } from "./AppErrorMap.js";
class AppError extends Error {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorObjectMessage = {};
  }
  validation(res) {
    this.checkErrorCode(res);
    if (!res.headersSent) {
      this.checkErrorSendPage(res);
    }
  }
  checkErrorCode(res) {
    const code = this.errorCode;
    for (const [codeError, field] of Object.entries(mapErrorCode)) {
      if (code == codeError) {
        this.errorObjectMessage[field] = this.message;
        const errors = this.errorObjectMessage;
        res.status(this.statusCode).json({ errors });
      }
    }
  }
  checkErrorSendPage(res) {
    const code = this.errorCode;
    for (const [codeError, page] of Object.entries(mapErrorCode)) {
      if (code == codeError) {
        res.status(this.statusCode).send(page);
      }
    }
  }
}

export { AppError };
