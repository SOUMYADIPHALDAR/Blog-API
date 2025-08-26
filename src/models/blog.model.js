const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [String],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    isBoolean: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;