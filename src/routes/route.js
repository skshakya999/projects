const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.post("/authors", authorController.createAuthor)
router.post("/createBlog", blogController.createBlog)
router.put("/blogs/:blogId", blogController.updateBlog)
router.post("/blogs/:blogId", blogController.deletePost)
// router.post("/blogs", blogController.deletePostQuery)


module.exports = router;