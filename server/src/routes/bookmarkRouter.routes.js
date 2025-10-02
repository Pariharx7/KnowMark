import {Router} from "express";
import{verifyJWT} from "../middlewares/auth.middleware.js";
import {
    getAllBookmarks,
    addABookmark,
    deleteABookmark
} from "../controllers/bookmark.controller.js"

const router = Router();
router.use(verifyJWT);

router
    .route("/")
    .get(getAllBookmarks)
    .post(addABookmark)

router.route("/:id", deleteABookmark)

export default router