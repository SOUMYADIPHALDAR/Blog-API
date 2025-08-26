const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware.js");
const { createBlog, getAllBlogs, getOneBlog, updateBlog, deleteBlog, likeBlog} = require("../controllers/blog.controller.js");

router.post("/", auth, createBlog);

router.get("/", getAllBlogs);

router.get("/:id", getOneBlog);

router.put("/:id", auth, updateBlog);

router.delete("/:id", auth, deleteBlog);

router.post("/:id/like", auth, likeBlog);

module.exports = router;