import {Router} from "express";
import{verifyJWT} from "../middlewares/auth.middleware.js";
import {
    getAllBookmarks,
    addABookmark,
    deleteABookmark,
    updateABookmark,
    searchBookmarks
} from "../controllers/bookmark.controller.js"

const router = Router();
router.use(verifyJWT);

router
    .route("/")
    .get(getAllBookmarks)
    .post(addABookmark)

router
    .route("/:id")
    .delete(deleteABookmark)
    .put(updateABookmark)

router.get("/search", searchBookmarks);


export default router