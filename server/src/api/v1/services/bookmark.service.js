import mongoose from "mongoose";
import { Bookmark } from "../../common/models/index.js";
import { User } from "../../common/models/index.js";
import { paginateQuery, ApiError } from "../../common/utils/index.js";

const getAllBookmarks = async (userId, page, limit) => {
  const bookmarksQuery = Bookmark.find({
    userId,
  })
    .populate("userId", "name")
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean();
  const result = await paginateQuery(bookmarksQuery, page, limit);

  const bookmarksList = result.data.map((bookmark) => {
    const utcDate = new Date(bookmark.createdAt);
    return {
      user: bookmark.userId?.name || "User",
      id: bookmark._id,
      name: bookmark.title,
      url: bookmark.url,
      notes: bookmark.notes,
      date: utcDate.toLocaleDateString("en-GB"),
      time: utcDate.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
    };
  });

  return { bookmarks: bookmarksList, pagination: result.pagination };
};

const getBookmarkById = async (userId, bookmarkId) => {
  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    throw new ApiError(400, "Invalid Bookmark Id");
  }

  const [bookmarkById, user] = await Promise.all([
    Bookmark.findOne({ _id: bookmarkId, userId })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean(),
    User.findById(userId).select("starredBookmarks name").lean(),
  ]);

  const starredBookmarksArray = user?.starredBookmarks.map(
    (id) => id.toString() || []
  );
  // console.log("50 User ", user.name);

  const isStarred = starredBookmarksArray.includes(bookmarkId);
  const utcDate = new Date(bookmarkById.createdAt);
  const bookmark = {
    user: user.name || "You",
    id: bookmarkById._id,
    title: bookmarkById.title,
    url: bookmarkById.url,
    notes: bookmarkById.notes,
    tags: bookmarkById.tags,
    category: bookmarkById.category,
    date: utcDate.toLocaleDateString("en-GB"),
    time: utcDate.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
    isStarred: starredBookmarksArray.includes(bookmarkId),
  };

  return { bookmark: bookmark, isStarred: isStarred };
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

  const bookmark = await Bookmark.findOne({ _id: bookmarkId, userId });
  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found or not authorized to update");
  }

  if (title) bookmark.title = title;
  if (notes) bookmark.notes = notes;
  if (tags) bookmark.tags = tags;
  if (category) bookmark.category = category;

  await bookmark.save();

  return bookmark;
};

const searchBookmark = async (query, page, limit, userId) => {
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "i");

  const bookmarksQuery = Bookmark.find({
    userId,
    $or: [
      { title: regex },
      { notes: regex },
      { category: regex },
      { url: regex },
      { tags: regex },
    ],
  })
    .select("-__v")
    .sort({ createdAt: -1 });

  const result = await paginateQuery(bookmarksQuery, page, limit);

  const bookmarksList = result.data.map((bookmark) => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    tags: bookmark.tags,
    category: bookmark.category,
    notes: bookmark.notes,
  }));

  return { bookmarks: bookmarksList, pagination: result.pagination };
};

const getStarredBookmarks = async (userId, page, limit) => {
  const user = await User.findById(userId).select("starredBookmarks");

  const starredBookmarkIds = user.starredBookmarks.map(
    (bookmarkId) => bookmarkId
  );

  const starredBookmarksQuery = Bookmark.find({
    _id: { $in: starredBookmarkIds },
    userId,
  })
    .populate("userId", "name")
    .select("-__v")
    .sort({ createdAt: -1 });

  const result = await paginateQuery(starredBookmarksQuery, page, limit);

  const starredBookmarksList = result.data.map((bookmark) => {
    const utcDate = new Date(bookmark.createdAt);

    return {
      user: bookmark.userId?.name || "User",
      id: bookmark.id,
      name: bookmark.title,
      url: bookmark.url,
      tags: bookmark.tags,
      category: bookmark.category,
      notes: bookmark.notes,
      date: utcDate.toLocaleDateString("en-GB"),
      time: utcDate.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
    };
  });

  return {
    bookmarks: starredBookmarksList,
    pagination: result.pagination,
  };
};

const starBookmark = async (userId, bookmarkId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { starredBookmarks: bookmarkId } },
    { new: true }
  );
  return { user: updatedUser };
};

const unstarBookmark = async (userId, bookmarkId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { starredBookmarks: bookmarkId } },
    { new: true }
  );
  return { user: updatedUser };
};

export const bookmarkService = {
  getBookmarks: getAllBookmarks,
  getBookmark: getBookmarkById,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  searchBookmark,
  getStarredBookmarks,
  starBookmark,
  unstarBookmark,
};
