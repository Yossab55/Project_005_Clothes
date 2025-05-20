import express from "express";
import { loginController } from "../controllers/loginController.js";
import { tryCatch } from "../utils/tryCatch.js";

const loginRouter = express.Router();

loginRouter.get("", loginController.getLoginView);

loginRouter.post("", tryCatch(loginController.loginUser));

export { loginRouter };
