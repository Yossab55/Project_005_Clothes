import mongoose from "mongoose";
import { itemModel } from "../models/itemModel.js";
import { AppError } from "../utils/errors/AppError.js";
import { getObjectId } from "../utils/getObjectId.js";
import { deleteFileBy } from "../utils/fileHandle.js";
import { DbManager } from "../utils/DB/DbManager.js";
import { tryCatch } from "../utils/tryCatch.js";
import {
  RESPONSE_CODE_BAD,
  RESPONSE_CODE_CREATED_SUCCESSFULLY,
  RESPONSE_CODE_GOOD,
  RESPONSE_CODE_UPDATED_NO_CONTENT,
} from "../utils/constant/responseCode.js";
import { ERROR_CODE_ITEM_NOT_FOUND } from "../utils/constant/errorCode.js";
//* helpers
async function getItem(req, res, next) {
  const itemId = req.params.id;
  const item = await itemModel.findById(itemId);
  if (!item) {
    throw new AppError(
      ERROR_CODE_ITEM_NOT_FOUND,
      "No such Item with this id",
      RESPONSE_CODE_BAD
    );
  }
  req.item = item;
  next();
}

//# get items
async function getAll(req, res) {
  const items = await getItemByQuery(req, res);
  res
    .status(RESPONSE_CODE_GOOD)
    .render("items.ejs", { pagename: "home", items });
}
async function getItemByQuery(req, res) {
  if (checkQueryParamPageLimit(req)) {
    return getItemByPageLimit(req, res);
  }

  if (checkQueryParamCategories(req)) {
    return getItemByCategory(req, res);
  }

  const items = await itemModel.find({ userId: getObjectId(req.userId) });
  console.log(items);
  return items;
}

function checkQueryParamPageLimit(req) {
  if (req.query.page && req.query.limit) return true;
  return false;
}

async function getItemByPageLimit(req, res) {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const items = await itemModel
    .findMany({ userId: req.userId })
    .skip(skip)
    .limit(limit);
  return items;
}

function checkQueryParamCategories(req) {
  if (req.query.categories) return true;
  return false;
}

async function getItemByCategory(req, res) {
  // consider it's one value until I see how I can do it
  const { category } = req.query;
  const items = await itemModel.findMany({
    $and: [{ userId: req.userId }, { category: category }],
  });
  return items;
}
//# get show item by id
function showItem(req, res) {
  const item = req.item;
  res.status(RESPONSE_CODE_GOOD).json({ item });
}
//# post create item
async function create(req, res) {
  const { timeUsed, itemName, category } = req.body;
  const itemData = {
    userId: getObjectId(req.userId),
    timeUsed,
    itemName,
    category,
  };
  if (req.file) {
    itemData.imageSource = req.file.filename;
  } else {
    itemData.imageSource = undefined;
  }
  const newItem = await itemModel.create(itemData);
  res.status(RESPONSE_CODE_CREATED_SUCCESSFULLY).json({ newItem });
}

//# patch increment
async function incrementOrDecrement(req, res) {
  const value = req.body.incrementOrDecrementValue;
  const id = getObjectId(req.item["_id"]);

  await itemModel.update(
    { _id: id },
    {
      $inc: { timeUsed: value },
    }
  );
  res.status(RESPONSE_CODE_UPDATED_NO_CONTENT);
}
//# patch update item
async function updateItem(req, res) {
  const item = req.item;
  const id = item["_id"];
  const data = req.body;
  await DbManager.update(itemModel, item, data, id);
  const updatedItem = itemModel.findById(item["_id"]);
  const newImageUrl = updatedItem.fullImageUrl;
  if (newImageUrl != item.fullImageUrl) {
    tryCatch(deleteFileBy(item.fullImageUrl));
  }
  res.status(RESPONSE_CODE_GOOD).json({ updatedItem });
}
//# remove item request
async function remove(req, res) {
  const item = req.item;
  const fullImageUrl = item.fullImageUrl;
  console.log("hello world");
  if (fullImageUrl) {
    tryCatch(deleteFileBy(fullImageUrl));
  }
  const result = await itemModel.deleteOne({ _id: item._id });
  //todo redirect to /items
  res.status(RESPONSE_CODE_GOOD).json({ result });
}
//# remove if parent -user- removed
async function removeFromParent(id) {
  await itemModel.deleteMany({ userId: getObjectId(id) });
}
const itemController = {
  getAll,
  getItem,
  showItem,
  create,
  incrementOrDecrement,
  updateItem,
  remove,
};

export { itemController };
export { removeFromParent };
