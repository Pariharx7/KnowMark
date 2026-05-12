import { Router } from "express";
import { serverHealthCheck } from "../controllers/index";

const router = Router();

router.route("/").get(serverHealthCheck);

export default router;
