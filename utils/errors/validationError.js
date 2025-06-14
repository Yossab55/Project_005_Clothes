import { RESPONSE_CODE_BAD } from "../constant/responseCode.js";
import { deleteFileFrom } from "../fileHandle.js";
class ValidationError {
  constructor(error, req, res) {
    this.error = error;
    this.req = req;
    this.res = res;
  }
  validationError() {
    if (this.#checkItIsItemError()) {
      deleteFileFrom(req);
    }
    let errors = {};
    Object.values(this.error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    this.res.status(RESPONSE_CODE_BAD).json({ errors });
  }
  #checkItIsItemError() {
    if (this.error.message.includes("Item")) {
      return true;
    }
    return false;
  }
}

export { ValidationError };
