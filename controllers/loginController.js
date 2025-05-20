import { userModel } from "../models/userModel.js";
import { RESPONSE_CODE_CREATED_SUCCESSFULLY } from "../source/constant/responseCode.js";
import { MAX_AGE } from "../source/constant/timeConstants.js";
import { createToken } from "../utils/createToken.js";

function getLoginView(req, res) {
  res.render("login.ejs");
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const userData = {
    email,
    password,
  };
  // const user = await userModel.create(userData);
  const user = await userModel.login(userData);
  res.cookie("jwt", createToken(user["_id"]), {
    httpOnly: true,
    maxAge: MAX_AGE,
  });
  res.status(RESPONSE_CODE_CREATED_SUCCESSFULLY).json({ user });
}

const loginController = {
  getLoginView,
  loginUser,
};

export { loginController };
