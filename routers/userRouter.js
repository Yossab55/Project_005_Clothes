import express from "express";
import { userController } from "../controllers/userController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
import { passwordConfirmation } from "../middleware/passwordConfirmation.js";
const userRouter = express.Router();

userRouter.get(
  "/:id",
  requiredAuth,
  tryCatch(userController.getUser),
  userController.getUserData
);

userRouter.patch(
  "/:id",
  requiredAuth,
  tryCatch(userController.getUser),
  userController.update
);

userRouter.delete(
  "/:id",
  requiredAuth,
  tryCatch(userController.getUser),
  tryCatch(passwordConfirmation),
  userController.update
);
export { userRouter };
