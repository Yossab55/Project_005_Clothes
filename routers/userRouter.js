import express from "express";
import { userController } from "../controllers/userController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
import { passwordConfirmation } from "../middleware/passwordConfirmation.js";
const userRouter = express.Router();

userRouter.get(
  "",
  tryCatch(requiredAuth),
  tryCatch(userController.getUser),
  userController.getUserData
);

userRouter.patch(
  "",
  tryCatch(requiredAuth),
  tryCatch(userController.getUser),
  tryCatch(passwordConfirmation),
  tryCatch(userController.update)
);

userRouter.delete(
  "/",
  tryCatch(requiredAuth),
  tryCatch(userController.getUser),
  tryCatch(passwordConfirmation),
  tryCatch(userController.remove)
);
export { userRouter };
