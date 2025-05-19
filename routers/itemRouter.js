import express from "express";
import { ItemController } from "../controllers/ItemController.js";
const ItemRouter = express.Router();

ItemRouter.get("/", ItemController.showAll);
export { ItemRouter };
