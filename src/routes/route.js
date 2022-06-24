const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth')

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.post("/authors", authorController.createAuthor)
router.post("/login", authorController.loginAuthor)
router.post("/createBlog",blogController.createBlog)
router.put("/blogs/:blogId",  Auth.authorise, blogController.updateBlog)
router.post("/blogs/:blogId",  Auth.authorise, blogController.deletePost)
router.post("/blogs",  Auth.authorise, blogController.deletePostQuery)
router.get("/getBlogs",blogController.getBlogs)


module.exports = router;