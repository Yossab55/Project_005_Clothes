import { getObjectId } from "../getObjectId.js";
class MongoGrammar {
  static updateGrammar(oldData, data = {}, id) {
    const filter = { _id: getObjectId(id) };
    const fields = Object.keys(oldData).filter(
      (field) => !["_id", "_v"].includes(field)
    );
    let updateFiled = {};
    Object.entries(data).forEach(([field, value]) => {
      if (fields.includes(field)) updateFiled[field] = value || oldData.felid;
    });
    const update = { $set: updateFiled };
    return { filter, update };
  }
}

export { MongoGrammar };
