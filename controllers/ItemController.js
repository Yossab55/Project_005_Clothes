import { ItemsModel } from "../models/ItemsModel.js";
import { Code } from "../source/Code.js";
async function showAll(request, response) {
  try {
    const ITEMS = await ItemsModel.find();
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
