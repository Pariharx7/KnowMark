import {
  ApiResponse,
  asyncHandler,
  ApiError,
} from "../../common/utils/index.js";
import { bookmarkService } from "../services/index.js";
import { bookmarkValidator } from "../validators/index.js";
import { Bookmark } from "../../common/models/index.js";
import mongoose from "mongoose";

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

const getBookmarkById = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const bookmarkId = req.params.id;

  const { bookmark, isStarred } = await bookmarkService.getBookmark(
    userId,
    bookmarkId
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { bookmark, isStarred },
        "Bookmark fetched successfully"
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
  await bookmarkService.deleteBookmark(req.user._id, req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Bookmark deleted successfully"));
});

const updateABookmark = asyncHandler(async (req, res) => {
  const { error } = ValidateUpdate(req.body);
  if (error) throw new ApiError(400, error.issues[0].message);

  const updatedBookmark = await bookmarkService.updateBookmark(
    req.user._id,
    req.params.id,
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
  const { query, page, limit } = req.query;
  if (!query) throw new ApiError(400, "Search Query is required");
  try {
    const { bookmarks, pagination } = await bookmarkService.searchBookmark(
      query,
      page,
      limit,
      userId
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { bookmarks, pagination },
          "Search results fetched successfully"
        )
      );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "An error occurred while searching for bookmarks");
  }
});

const getStarredBookmarks = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  const { bookmarks, pagination } = await bookmarkService.getStarredBookmarks(
    req.user._id,
    page,
    limit
  );

  return res.json(
    new ApiResponse(
      200,
      { bookmarks, pagination },
      "Starred Bookmarks fetched successfully"
    )
  );
});

const starBookmark = asyncHandler(async (req, res) => {
  const bookmarkId = req.params.id;
  if (!bookmarkId || !mongoose.Types.ObjectId.isValid(bookmarkId)) {
    throw new ApiError(400, "A valid bookmark Id is required");
  }

  const { user } = await bookmarkService.starBookmark(
    req.user._id,
    req.params.id
  );

  return res
    .status(201)
    .json(new ApiResponse(201, { user }, "Bookmark starred successfully"));
});

const unstarBookmark = asyncHandler(async (req, res) => {
  const bookmarkId = req.params.id;
  if (!bookmarkId || !mongoose.Types.ObjectId.isValid(bookmarkId)) {
    throw new ApiError(400, "A valid bookmark Id is required");
  }

  const { user } = await bookmarkService.unstarBookmark(
    req.user._id,
    req.params.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Bookmark unstarred successfully"));
});

export const bookmarkController = {
  getAllBookmarks,
  getBookmark: getBookmarkById,
  addABookmark,
  deleteABookmark,
  updateABookmark,
  searchBookmarks,
  getStarredBookmarks,
  starBookmark,
  unstarBookmark,
};
