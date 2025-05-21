import { userModel } from "../models/userModel.js";
import { RESPONSE_CODE_CREATED_SUCCESSFULLY } from "../utils/constant/responseCode.js";
import { createToken } from "../utils/createToken.js";
import { MAX_AGE } from "../utils/constant/timeConstants.js";
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
  const token = createToken();
  res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
  //todo redirect to home page
  res.status(RESPONSE_CODE_CREATED_SUCCESSFULLY).json({ user });
}

const signupController = {
  getSignupView,
  createUser,
};

export { signupController };
