import {
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_WRONG_PASSWORD,
  ERROR_CODE_PASSWORD_CONFIRMATION,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_PASSWORD_EMPTY,
  ERROR_CODE_ITEM_NOT_FOUND,
} from "../constant/errorCode.js";

const mapErrorCode = {
  [ERROR_CODE_EMAIL_NOT_FOUND]: "email",
  [ERROR_CODE_WRONG_PASSWORD]: "password",
  [ERROR_CODE_PASSWORD_CONFIRMATION]: "passwordConfirmation",
  [ERROR_CODE_PASSWORD_EMPTY]: "password",
  [ERROR_CODE_ITEM_NOT_FOUND]: "item",
};

const mapErrorSendPage = {
  [ERROR_CODE_FORBIDDEN]: "/403.ejs",
};

export { mapErrorCode, mapErrorSendPage };
