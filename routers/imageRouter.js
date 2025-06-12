import express from "express";
import { imageController } from "../controllers/imageController.js";
const imageRouter = express.Router();

imageRouter.get("/:imageName", imageController.getImage);

export { imageRouter };
