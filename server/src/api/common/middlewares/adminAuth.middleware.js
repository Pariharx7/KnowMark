import { ApiError } from "../utils/index.js";

const adminAuth = (req, res, next) => {
  const clientKey = req.headers["x-admin-key"];

  if (!clientKey || clientKey !== process.env.ADMIN_AUTH_KEY) {
    throw new ApiError(401, "Access Denied: Invalid or missing Admin API Key");
  }
  next();
};

export { adminAuth };
