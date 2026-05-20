import {
  ApiResponse,
  asyncHandler,
  ApiError,
} from "../../common/utils/index.js";
import { bookmarkService } from "../services/index.js";
import { bookmarkValidator } from "../validators/index.js";

const { ValidateCreate, ValidateUpdate } = bookmarkValidator;
const getAllBookmarks = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  const { bookmarks, pagination } = await bookmarkService.getBookmarks(
    req.user._id,
    page,
    limit
  );

  return res.json(
    new ApiResponse(
      200,
      { bookmarks, pagination },
      "Bookmarks fetched successfully"
    )
  );
});

const addABookmark = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { error } = ValidateCreate(req.body);
  if (error) throw new ApiError(400, error.issues[0].message, []);

  const { url, title, notes = "", tags = [], category = "" } = req.body;

  const { bookmark } = await bookmarkService.addBookmark(
    userId,
    url,
    title,
    notes,
    tags,
    category
  );

  return res
    .status(201)
    .json(new ApiResponse(201, { bookmark }, "Bookmark added successfully"));
});

const deleteABookmark = asyncHandler(async (req, res) => {
  await bookmarkService.deleteBookmark(req.user._id, req.params.bookmarkId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Bookmark deleted successfully"));
});

const updateABookmark = asyncHandler(async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  throw new ApiError(400, error.issues[0].message);

  const updatedBookmark = await bookmarkService.updateBookmark(
    req.user._id,
    req.params.bookmarkId,
    req.body
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { bookmark: updatedBookmark },
        "Bookmark updated successfully"
      )
    );
});

const searchBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search Query is required");
  }

  const bookmarks = await Bookmark.find(
    {
      $text: { $search: query },
      userId,
    },
    {
      score: { $meta: "textScore" },
    }
  ).sort({ score: { $meta: "textScore" } });

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookmarks, "Search results fetched successfully")
    );
});

export const bookmarkController = {
  getAllBookmarks,
  addABookmark,
  deleteABookmark,
  updateABookmark,
  searchBookmarks,
};
