const Blog = require("../models/blog.model.js");

//Add a new blog
const createBlog = async(req, res) => {
    try {
        const blog = await Blog.create({...req.body, author: req.user.id});
        res.status(201).json({success: true, message: "New blog created.."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get all blogs
const getAllBlogs = async(req, res) => {
    try {
        const blog = await Blog.find().populate("author", "firstName lastName email");
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get One blog
const getOneBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "firstName lastName");
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Update blog
const updateBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "firstName lastName");
        if(!blog) {
            return res.status(404).json({message: "Blog not found.."});
        }
        if(blog.author.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized.."});
        }
        const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({success: true, updated});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Delete blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "firstName lastName");
        if(!blog) {
            return res.status(404).json({message: "Blog not found.."});
        }
        if(blog.author.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized.."});
        }
        await blog.deleteOne();
        res.status(200).json({success: true, message: "Blog deleted successfully.."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Like
const likeBlog = async (req, res) => {
    try {
        const blog  = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message: "Blog not found.."});
        }
        const userId = req.user.id;
        if(!blog.likes){
            blog.likes = [];
        }
        if(blog.likes.includes(userId)){
            blog.likes = blog.likes.filter((id) => id.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog,
    likeBlog
}