import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { env } from "../source/helpers.js";
import { RESPONSE_CODE_CREATED_SUCCESSFULLY } from "../source/constant/responseCode.js";
const MAX_AGE = 30 * 24 * 60 * 60;
function getSignupView(req, res) {
  res.render("signup.ejs");
}

async function createUser(req, res) {
  const { username, email, password } = req.body;
  const userData = {
    username,
    email,
    password,
  };
  const user = await userModel.create(userData);
  const token = await jwt.sign(
    {
      id: user["_id"],
    },
    env("JWT_SECRET"),
    { expiresIn: MAX_AGE }
  );
  res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
  res.status(RESPONSE_CODE_CREATED_SUCCESSFULLY).json({ user });
}

const signupController = {
  getSignupView,
  createUser,
};

export { signupController };
