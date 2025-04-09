import express from "express";
import { ItemsController } from "../controllers/ItemController.js";
const ItemsRouter = express.Router();

ItemsRouter.get("/", ItemsController.showAll);
export {ItemsRouter}