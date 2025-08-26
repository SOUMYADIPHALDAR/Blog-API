const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware.js");
const { addComment, getComments, oneComment, updateComment, deleteComment} = require("../controllers/comment.controller.js");

// Nest under /blog/:blogId/comments
router.post("/:blogId/comments", auth, addComment);
router.get("/:blogId/comments", getComments);
router.get("/:blogId/comments/:commentId", oneComment);
router.put("/:blogId/comments/:commentId", auth, updateComment);
router.delete("/:blogId/comments/:commentId", auth, deleteComment);

module.exports = router;