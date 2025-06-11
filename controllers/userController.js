import { userModel } from "../models/userModel.js";
import { AppError } from "../utils/errors/AppError.js";
import {
  RESPONSE_CODE_FORBIDDEN,
  RESPONSE_CODE_GOOD,
} from "../utils/constant/responseCode.js";
import { ERROR_CODE_FORBIDDEN } from "../utils/constant/errorCode.js";
import { DbManager } from "../utils/DB/DbManager.js";
import { removeFromParent } from "./itemController.js";

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
  if (data) {
    if (data.passwordConfirmation)
      req.passwordConfirmation = data.passwordConfirmation;
  }
  req.user = user;
  next();
}

function getUserData(req, res) {
  const user = req.user;
  res.status(RESPONSE_CODE_GOOD).json({ user });
}

async function update(req, res) {
  const user = req.user;

  const result = await DbManager.update(userModel, user, req.body, user.id);
  const updatedUser = await userModel.findById(user.id);
  console.log(updatedUser);
  res.status(RESPONSE_CODE_GOOD).json({ updatedUser });
}

async function remove(req, res) {
  const user = req.user;
  await userModel.deleteOne(user.id);
  removeFromParent(user.id);
  res.status(RESPONSE_CODE_GOOD).json({ message: "deleted successfully" });
}
const userController = {
  getUser,
  getUserData,
  update,
  remove,
};

export { userController };
