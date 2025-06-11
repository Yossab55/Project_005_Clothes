import { RESPONSE_CODE_BAD } from "../constant/responseCode.js";
import { deleteFileFrom } from "../fileHandle.js";

function validationError(req, res) {
  if (checkItIsItemError.call(this)) {
    deleteFileFrom(req);
  }
  let errors = {};
  Object.values(this.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  res.status(RESPONSE_CODE_BAD).json({ errors });
}
function checkItIsItemError() {
  if (this.message.includes("Item")) {
    return true;
  }
  return false;
}

export { validationError };
