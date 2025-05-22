import bcrypt from "bcrypt";
import { AppError } from "./AppError.js";
import { ERROR_CODE_PASSWORD_CONFIRMATION } from "./constant/errorCode.js";
import { RESPONSE_CODE_BAD } from "./constant/responseCode.js";
function env(prop) {
  return process.env[prop] || undefined;
}

// async function passwordConfirmation(oldPassword, userPassword) {
//   const check = await bcrypt.compare(oldPassword, userPassword);
//   if (!check)
//     throw new AppError(
//       ERROR_CODE_PASSWORD_CONFIRMATION,
//       "You're password is wrong",
//       RESPONSE_CODE_BAD
//     );
//   return check;
// }

export { env /*passwordConfirmation*/ };
