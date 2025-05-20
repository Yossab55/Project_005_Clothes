import express from "express";
import { signupController } from "../controllers/signupController.js";
import { tryCatch } from "../utils/tryCatch.js";
const signupRouter = express.Router();

signupRouter.get("/", signupController.getSignupView);

signupRouter.post("/", tryCatch(signupController.createUser));

export { signupRouter };
