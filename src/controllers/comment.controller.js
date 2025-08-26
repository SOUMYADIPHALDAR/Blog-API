const Comment = require("../models/comment.model.js");
const Blog = require("../models/blog.model.js");
const User = require("../models/user.model.js");

const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { blogId } = req.params;
        const userId = req.user.id;

        if(!content){
            return res.status(400).json({message: "Comment is empty.."});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found.."});
        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }

        const comment = await Comment.create(({
            content,
            user: userId,
            blog: blogId
        }))
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }
        const comments = await Comment.find({ blog: blogId }).populate("user", "name email");
        if(comments.length === 0){
            return res.status(404).json({message: "No comments found.."});
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const oneComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }

        const comment = await Comment.findOne({_id: commentId, blog: blogId}).populate("user", "name email");
        if(!comment){
            return res.status(404).json({message: "Comment not found.."});
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateComment = async(req, res) => {
    try {
        const { blogId, commentId } = req.params;

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }

        const comment = await Comment.findOne({_id: commentId, blog: blogId}).populate("user", "name email");
        if(!comment){
            return res.status(404).json({message: "Comment not found.."});
        }

        const {content} = req.body;
        const updateCom = await Comment.findOneAndUpdate(
            {_id: commentId, blog: blogId},
            {content},
            {new: true}
        ).populate("user", "name email");

        res.status(200).json(updateCom);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteComment = async(req, res) => {
    try {
        const {blogId, commentId} = req.params;

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }

        const comment = await Comment.findOneAndDelete({_id: commentId, blog: blogId});
        if(!comment){
            return res.status(404).json({message: "Comment not found.."});
        }
        res.status(200).json({success: true, message: "Comment deleted successfully.."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addComment,
    getComments,
    oneComment,
    updateComment,
    deleteComment
};