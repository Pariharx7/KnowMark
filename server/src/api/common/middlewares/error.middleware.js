import mongoose from "mongoose";

import { ApiError } from "../utils/index.js";
import { logger } from "../../../config/index.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if ((!error) instanceof ApiError) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";

    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };
  logger.error(`${error.message}`, { metadata: error });

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
