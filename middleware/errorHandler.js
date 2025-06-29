import { ErrorHandleAbstraction } from "../utils/errors/ErrorHandleAbstraction.js";
async function errorHandler(error, req, res, next) {
  console.log(error);
  const valid = new ErrorHandleAbstraction(error, req, res, next);
  valid.handleError();
}

export { errorHandler };
