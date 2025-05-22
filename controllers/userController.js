import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import {
  RESPONSE_CODE_FORBIDDEN,
  RESPONSE_CODE_GOOD,
  RESPONSE_CODE_UPDATED_NO_CONTENT,
} from "../utils/constant/responseCode.js";
import { ERROR_CODE_FORBIDDEN } from "../utils/constant/errorCode.js";
// import { passwordConfirmation } from "../utils/helpers.js";

async function getUser(req, res, next) {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new AppError(
      ERROR_CODE_FORBIDDEN,
      "that user is forbidden",
      RESPONSE_CODE_FORBIDDEN
    );
  }
  res.user = user;
  next();
}

function getUserData(req, res) {
  const user = res.user;
  res.status(RESPONSE_CODE_GOOD).json({ user });
}

async function update(req, res) {
  const { username, email } = req.body;
  const user = res.user;

  if (username) {
    user.username = username;
  }

  if (email) {
    user.email = email;
  }
  const updatedUser = await user.save();
  res.status(RESPONSE_CODE_UPDATED_NO_CONTENT).json({ updatedUser });
}
const userController = {
  getUser,
  getUserData,
  update,
};

export { userController };
