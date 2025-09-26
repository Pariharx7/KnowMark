import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js"

const router = Router();

router.route('/auth/register').post(registerUser);

router.route('/auth/login').post(loginUser);

export default router