import jwt from "jsonwebtoken";
import { env } from "../utils/helpers.js";
import { MAX_AGE } from "../utils/constant/timeConstants.js";

function createToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    env("JWT_SECRET"),
    { expiresIn: MAX_AGE }
  );
  return token;
}

export { createToken };
