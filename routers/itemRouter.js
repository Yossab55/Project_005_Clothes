import express from "express";
import { ItemController } from "../controllers/itemController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
const itemRouter = express.Router();

itemRouter.get("/", tryCatch(requiredAuth), ItemController.getAll);
export { itemRouter };
