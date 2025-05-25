import mongoose from "mongoose";
import { itemModel } from "../models/itemModel.js";
import {
  RESPONSE_CODE_GOOD,
  RESPONSE_CODE_UPDATED_NO_CONTENT,
} from "../utils/constant/responseCode.js";
import { getObjectId } from "../utils/getObjectId.js";

//# get items
async function getAll(req, res) {
  const items = getItemByQuery(req, res);

  res.status(RESPONSE_CODE_GOOD).json({ items });
}
async function getItemByQuery(req, res) {
  if (checkQueryParamPageLimit(req)) {
    return getItemByPageLimit(req, res);
  }

  if (checkQueryParamCategories(req)) {
    return getItemByCategory(req, res);
  }

  return await itemModel.findMany({ userId: res.userId });
}

function checkQueryParamPageLimit(req) {
  if (req.query.page && req.query.limit) return true;
  return false;
}

async function getItemByPageLimit(req, res) {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const items = await itemModel
    .findMany({ userId: res.userId })
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
    $and: [{ userId: res.userId }, { category: category }],
  });
  return items;
}

//# patch increment

async function incrementOrDecrement(req, res) {
  const value = req.body.incrementOrDecrementValue;
  const id = getObjectId(res.userId);

  await itemModel.update(
    { _id: id },
    {
      $inc: { timeUsed: value },
    }
  );
  res.status(RESPONSE_CODE_UPDATED_NO_CONTENT);
}
//# remove if parent -user- removed
async function removeFromParent(id) {
  await itemModel.deleteMany({ userId: new mongoose.Types.ObjectId(id) });
}
const ItemsController = { getAll, removeFromParent, incrementOrDecrement };

export { ItemsController };
