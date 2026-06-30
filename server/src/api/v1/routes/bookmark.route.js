import express from "express";

import { bookmarkController } from "../controllers/index.js";
import { authorization } from "../../common/middlewares/index.js";
const {
  getAllBookmarks,
  getBookmark,
  addABookmark,
  updateABookmark,
  deleteABookmark,
  searchBookmarks,
  getStarredBookmarks,
  starBookmark,
  unstarBookmark,
} = bookmarkController;

const router = express.Router();

router.route("/bulk").get(authorization, getAllBookmarks);

router.route("/starred").get(authorization, getStarredBookmarks);

router.route("/bm/:id").get(authorization, getBookmark);

router.route("/create").post(authorization, addABookmark);

router.route("/star/:id").put(authorization, starBookmark);

router.route("/unstar/:id").delete(authorization, unstarBookmark);

router.route("/:id").delete(authorization, deleteABookmark);

router.route("/:id").patch(authorization, updateABookmark);

router.get("/search", authorization, searchBookmarks);

export default router;
