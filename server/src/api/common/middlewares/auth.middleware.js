import jwt from "jsonwebtoken";

import { User } from "../models/index.js";
import { ApiError, asyncHandler } from "../utils/index.js";

const authorization = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Access Denied");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -__v"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { authorization };
