import { userModel } from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";

import {
  RESPONSE_CODE_FORBIDDEN,
  RESPONSE_CODE_GOOD,
  RESPONSE_CODE_UPDATED_NO_CONTENT,
} from "../utils/constant/responseCode.js";
import { ERROR_CODE_FORBIDDEN } from "../utils/constant/errorCode.js";
import { DbManager } from "../utils/DB/DbManager.js";
// import { passwordConfirmation } from "../utils/helpers.js";

async function getUser(req, res, next) {
  const data = req.body;
  const user = await userModel.findById(req.userId);
  if (!user) {
    throw new AppError(
      ERROR_CODE_FORBIDDEN,
      "that user is forbidden",
      RESPONSE_CODE_FORBIDDEN
    );
  }
  if (data.passwordConfirmation)
    res.passwordConfirmation = data.passwordConfirmation;
  res.user = user;
  next();
}

function getUserData(req, res) {
  const user = res.user;
  res.status(RESPONSE_CODE_GOOD).json({ user });
}

async function update(req, res) {
  const user = res.user;

  await DbManager.update(userModel, req.body, user.id);
  const updatedUser = await userModel.findById(user.id);
  res.status(RESPONSE_CODE_GOOD).json(updatedUser);
}

async function remove(req, res) {
  const user = res.user;
  await userModel.deleteOne(user.id);
  res.status(RESPONSE_CODE_GOOD).json({ message: "deleted successfully" });
}
const userController = {
  getUser,
  getUserData,
  update,
  remove,
};

export { userController };
