import winston from "winston";
import "winston-mongodb";

const { createLogger, transports, format } = winston;
const { combine, cli, timestamp, json, metadata } = format;

const envMode = process.env.NODE_ENV || "development";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  verbose: "purple",
  debug: "white",
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: envMode === "development" ? "debug" : "info",
      format: cli(),
    }),
    new transports.MongoDB({
      level: "error",
      format: combine(timestamp(), json(), metadata()),
      options: { useUnifiedTopology: true },
      db: process.env.DB_URL,
      collection: "logs-winston",
    }),
  ],
});

export default logger;
