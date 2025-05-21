import { userModel } from "../models/userModel.js";
import { RESPONSE_CODE_CREATED_SUCCESSFULLY } from "../utils/constant/responseCode.js";
import { createToken } from "../utils/createToken.js";
import { MAX_AGE } from "../utils/constant/timeConstants.js";

function getLoginView(req, res) {
  res.render("login.ejs");
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const userData = {
    email,
    password,
  };
  const user = await userModel.login(userData);
  res.cookie("jwt", createToken(user["_id"]), {
    httpOnly: true,
    maxAge: MAX_AGE * 1000,
  });
  //todo redirect to home page
  res.status(RESPONSE_CODE_CREATED_SUCCESSFULLY).json({ user });
}

const loginController = {
  getLoginView,
  loginUser,
};

export { loginController };
