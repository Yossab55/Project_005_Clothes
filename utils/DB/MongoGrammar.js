import mongoose from "mongoose";
import { getObjectId } from "../getObjectId.js";
class MongoGrammar {
  static updateGrammar(model, data = {}, id) {
    const filter = { _id: getObjectId(id) };
    let updateFiled = {};
    Object.entries(data).forEach(([felid, value]) => {
      updateFiled[felid] = value || model.felid;
    });
    const update = { $set: updateFiled };
    return { filter, update };
  }
}

export { MongoGrammar };
