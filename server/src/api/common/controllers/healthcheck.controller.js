import { asyncHandler, ApiResponse } from "../utils/asyncHandler";

const serverHealthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Server is working fine"));
});

export { serverHealthCheck };
