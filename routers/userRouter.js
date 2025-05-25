import express from "express";
import { userController } from "../controllers/userController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
import { passwordConfirmation } from "../middleware/passwordConfirmation.js";
const userRouter = express.Router();

userRouter.get(
  "/",
  requiredAuth,
  tryCatch(userController.getUser),
  userController.getUserData
);

userRouter.patch(
  "/",
  requiredAuth,
  tryCatch(passwordConfirmation),
  tryCatch(userController.getUser),
  tryCatch(userController.update)
);

userRouter.delete(
  "/",
  requiredAuth,
  tryCatch(userController.getUser),
  tryCatch(passwordConfirmation),
  tryCatch(userController.update)
);
export { userRouter };
