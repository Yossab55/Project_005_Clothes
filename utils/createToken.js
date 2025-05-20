import jwt from "jsonwebtoken";
import { env } from "../source/helpers.js";
import { MAX_AGE } from "../source/constant/timeConstants.js";

async function createToken(id) {
  const token = await jwt.sign(
    {
      id,
    },
    env("JWT_SECRET"),
    { expiresIn: MAX_AGE }
  );
  return token;
}

export { createToken };
