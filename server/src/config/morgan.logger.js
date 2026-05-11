import morgan from "morgan";
import { logger } from "./index";

const messageStream = {
  write: (message) => logger.verbose(message.trim()),
};

const skip = () => {
  const envMode = process.env.NODE_ENV || "development";
  return envMode !== "development";
};

const morganMiddleware = morgan(":method :url :status - :response-time ms", {
  messageStream,
  skip,
});

export default morganMiddleware;
