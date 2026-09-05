import { Router } from "express";
import { adminAuth } from "../middlewares/index.js";
import {
  getFeatures,
  addFeatures,
  editFeatures,
} from "../controllers/index.js";

const router = Router();

router
  .route("/")
  .get(getFeatures)
  .post(adminAuth, addFeatures)
  .patch(adminAuth, editFeatures);

export default router;
