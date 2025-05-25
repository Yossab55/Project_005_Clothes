import mongoose from "mongoose";
import { itemModel } from "../models/itemModel.js";
import { Code } from "../utils/code.js";
async function showAll(request, response) {
  try {
    const ITEMS = await itemModel.find();
    response.status(Code.GOOD).json({ ITEMS });
  } catch (error) {
    console.log("server error: " + error);
    response
      .status(Code.SERVER_DOWN)
      .json({ message: "error with db showAll function" });
  }
}

async function removeFromParent(id) {
  await itemModel.deleteMany({ userId: new mongoose.Types.ObjectId(id) });
}
const ItemsController = { showAll, removeFromParent };

export { ItemsController };
