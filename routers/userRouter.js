import express from "express";
import { userController } from "../controllers/userController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
const userRouter = express.Router();

userRouter.get(
  "/:id",
  requiredAuth,
  tryCatch(userController.getUser),
  userController.getUserData
);

userRouter.patch(
  "/:id",
  // requiredAuth,
  tryCatch(userController.getUser),
  userController.update
);
export { userRouter };
