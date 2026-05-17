import mongoose from "mongoose";

import { logger } from "./index.js";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);

    logger.info(`Connected to Database 🆗`);
  } catch (err) {
    logger.info("❌ Database connection error: ", err);
    process.exit(1);
  }
};

export default connectDB;
