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

    const { url, title, notes = "", tags = [] } = req.body;

    if(!url || !title){
        throw new ApiError(400, "URL and title are required");
    }

    const newBookmark = await Bookmark.create({
        url,
        title,
        notes,
        tags,
        userId
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, newBookmark, "Bookmark created successfully")
        )
});

const deleteABookmark = asyncHandler(async (req, res) => {
    
})

export {
    getAllBookmarks,
    addABookmark,
    deleteABookmark
}