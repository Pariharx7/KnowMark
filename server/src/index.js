import "dotenv/config";

import { connectDB, logger } from "./config/index";
import app from "./app";

await connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on Port ${port}`));
