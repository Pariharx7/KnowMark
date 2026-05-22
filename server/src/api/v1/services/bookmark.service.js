import mongoose from "mongoose";
import { Bookmark } from "../../common/models/index.js";
import { paginateQuery, ApiError } from "../../common/utils/index.js";

const getAllBookmarks = async (userId, page, limit) => {
  const bookmarksQuery = Bookmark.find({
    userId,
  })
    .populate("userId", "name")
    .select("-__v")
    .sort({ createdAt: -1 });

  const result = await paginateQuery(bookmarksQuery, page, limit);

  const bookmarksList = result.data.map((bookmark) => {
    const utcDate = new Date(bookmark.createdAt);

    return {
      user: bookmark.userId?.name || "User",
      name: bookmark.name,
      date: utcDate.toLocaleDateString("en-GB"),
      time: utcDate.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
    };
  });

  return { bookmarks: bookmarksList, pagination: result.pagination };
};

const addBookmark = async (userId, url, title, notes, tags, category) => {
  if (!url || !title) {
    throw new ApiError(400, "URL and Title are required");
  }
  const bookmark = await Bookmark.create({
    url,
    title,
    notes,
    tags,
    category,
    userId,
  });

  return { bookmark: bookmark };
};
const deleteBookmark = async (userId, bookmarkId) => {
  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    throw new ApiError(400, "Invalid Bookmark Id");
  }

  const bookmark = await Bookmark.findOne({
    _id: bookmarkId,
    userId,
  });

  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found or Not authorized to delete");
  }

  return await bookmark.deleteOne();
};
const updateBookmark = async (userId, bookmarkId, bookmarkData) => {
  const { url, title, notes, tags, category } = bookmarkData;

  const bookmark = await Bookmark.findById({ _id: bookmarkId, userId });

  if (url) bookmark.url = url;
  if (title) bookmark.url = title;
  if (notes) bookmark.url = notes;
  if (tags) bookmark.url = tags;
  if (category) bookmark.url = category;

  await bookmark.save();

  return bookmark.findById({ _id: bookmarkId, userId });
};
//requires pagination
const searchBookmark = async () => {};

export const bookmarkService = {
  getBookmarks: getAllBookmarks,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  searchBookmark,
};
