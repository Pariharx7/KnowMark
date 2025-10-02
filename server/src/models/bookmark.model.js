import mongoose, {mongo, Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookmarkSchema = new Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

bookmarkSchema.plugin(mongooseAggregatePaginate)

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema)