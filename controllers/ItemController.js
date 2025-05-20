import { ItemModel } from "../models/ItemModel.js";
import { Code } from "../source/code.js";
async function showAll(request, response) {
  try {
    const ITEMS = await ItemModel.find();
    response.status(Code.GOOD).json(ITEMS);
  } catch (error) {
    console.log("server error: " + error);
    response
      .status(Code.SERVER_DOWN)
      .json({ message: "error with db showAll function" });
  }
}

const ItemsController = { showAll };

export { ItemsController };
