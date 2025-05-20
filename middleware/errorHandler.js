import { RESPONSE_CODE_BAD } from "../source/constant/responseCode";

function errorHandler(error, req, res, next) {
  res.status(RESPONSE_CODE_BAD).send("my middleware is working");
}

export { errorHandler };
