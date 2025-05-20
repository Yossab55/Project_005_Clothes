import { ERROR_CODE_UNIQUE } from "../source/constant/errorCode.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_SERVER_DOWN,
} from "../source/constant/responseCode.js";

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

  res.status(RESPONSE_CODE_SERVER_DOWN).json({ error });
}

export { errorHandler };
