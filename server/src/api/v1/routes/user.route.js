import express from "express";

import { userController } from "../controllers/index.js";
import { authorization } from "../../common/middlewares/index.js";

const { getCurrentUser, updateCurrentUser } = userController;

const router = express.Router();

router
  .route("/me")
  .get(authorization, getCurrentUser)
  .patch(authorization, updateCurrentUser);

export default router;
