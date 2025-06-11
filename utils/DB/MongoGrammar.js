import { getObjectId } from "../getObjectId.js";
class MongoGrammar {
  static updateGrammar(oldData, data = {}, id) {
    const filter = { _id: getObjectId(id) };
    let updateFiled = {};

    Object.entries(data).forEach(([field, value]) => {
      if (oldData[field]) updateFiled[field] = value || oldData.field;
    });
    const update = { $set: updateFiled };
    return { filter, update };
  }
}

export { MongoGrammar };
