import { userModel } from "../models/userModel.js";

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
  // todo createCustom middleware for error handling;
  const user = userModel.create(userData);
}

const signupController = {
  getSignupView,
  createUser,
};

export { signupController };
