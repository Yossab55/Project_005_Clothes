import express from "express";
import { itemController } from "../controllers/itemController.js";
import { requiredAuth } from "../middleware/AuthMiddlewares.js";
import { tryCatch } from "../utils/tryCatch.js";
import { uploadFile } from "../utils/fileHandle.js";
const itemRouter = express.Router();

itemRouter.get("/", tryCatch(requiredAuth), itemController.getAll);

itemRouter.get(
  "/:id",
  tryCatch(requiredAuth),
  tryCatch(itemController.getItem),
  itemController.showItem
);

itemRouter.post(
  "/",
  tryCatch(requiredAuth),
  tryCatch(uploadFile("itemImage")),
  tryCatch(itemController.create)
);

itemRouter.patch(
  "/inc",
  tryCatch(requiredAuth),
  tryCatch(itemController.incrementOrDecrement)
);
itemRouter.patch(
  "/:id",
  tryCatch(requiredAuth),
  tryCatch(itemController.getItem),
  tryCatch(uploadFile("itemImage")),
  tryCatch(itemController.updateItem)
);
itemRouter.delete(
  "/:id",
  tryCatch(requiredAuth),
  tryCatch(itemController.getItem),
  tryCatch(itemController.remove)
);

export { itemRouter };
