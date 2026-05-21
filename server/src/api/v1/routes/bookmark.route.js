import express from "express";

import { bookmarkController } from "../controllers/index.js";
import { authorization } from "../../common/middlewares/index.js";
const {
  getAllBookmarks,
  addABookmark,
  updateABookmark,
  deleteABookmark,
  searchBookmarks,
} = bookmarkController;

const router = express.Router();

router.route("/").get(authorization, getAllBookmarks);

router.route("/create").post(authorization, addABookmark);

router.route("/bookmark/:id").delete(authorization, deleteABookmark);

router.route("/bookmark/:id").patch(authorization, updateABookmark);

router.get("/search", authorization, searchBookmarks);

export default router;
