const tryCatch = (controller) =>
  async function (req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error); // to path error arg
    }
  };

export { tryCatch };
