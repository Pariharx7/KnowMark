import mongoose from "mongoose";
import { Bookmark } from "../models/bookmark.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllBookmarks = asyncHandler(async (req, res) => {
    try{
        const userId = req.user?._id;

        if(!userId) {
            throw new ApiError(401, "Unauthorized: User not found");
        }

        const { category } = req.query;

        const filter = { userId };
        if(category) {
            filter.category = category;
        }

        const bookmarks = await Bookmark.find({ userId }).sort({createdAt: -1});

        return res
            .status(200)
            .json(
                new ApiResponse(200, bookmarks, "Bookmarks fetched successfully")
            );
    } catch(error){
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({error: 'Server error'});
    }
})

const addABookmark = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const { url, title, notes = "", tags = [], category = "" } = req.body;

    if(!url || !title){
        throw new ApiError(400, "URL and title are required");
    }

    const newBookmark = await Bookmark.create({
        url,
        title,
        notes,
        tags,
        category,
        userId
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, newBookmark, "Bookmark created successfully")
        )
});

const deleteABookmark = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const bookmarkId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(bookmarkId)) {
        throw new ApiError(400, "Invalid Bookmark ID");
    }

    const bookmark = await Bookmark.findOne({_id: bookmarkId, userId});

    if(!bookmark) {
        throw new ApiError(404, "Bookmark not found or not authorized to delete");
    }

    await bookmark.deleteOne();

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Bookmark deleted successfully")
        );
});

const updateABookmark = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const bookmarkId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(bookmarkId)) {
        throw new ApiError(400, "Invalid bookmark ID")
    }

    const bookmark= await Bookmark.findOne({ _id: bookmarkId, userId });

    if(!bookmark) {
        throw new ApiError(404, "Bookmark not found or not authorized to update");
    }

    const { title, url, notes, tags, category } = req.body;

    if(title !== undefined) bookmark.title = title;
    if(url !== undefined) bookmark.url = url;
    if(notes !== undefined) bookmark.notes = notes;
    if(tags !== undefined) bookmark.tags = tags;
    if(category !== undefined) bookmark.category = category;

    await bookmark.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, bookmark, "Bookmark updated successfully")
        );
});

const searchBookmarks = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { query } = req.query;

    if(!query) {
        throw new ApiError(400, "Search Query is required");
    }

    const bookmarks = await Bookmark.find(
        {
            $text: { $search: query },
            userId
        },
        {
            score: { $meta: "textScore" }
        }
    ).sort({ score: { $meta: "textScore" } });

    return res
        .status(200)
        .json(
            new ApiResponse(200, bookmarks, "Search results fetched successfully")
        );
});

export {
    getAllBookmarks,
    addABookmark,
    deleteABookmark,
    updateABookmark,
    searchBookmarks
}