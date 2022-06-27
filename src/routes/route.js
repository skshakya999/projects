const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth')

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.post("/authors", authorController.createAuthor)
router.post("/login", authorController.loginAuthor)
router.post("/createBlog",Auth.authenticate,blogController.createBlog)
router.put("/blogs/:blogId",Auth.authenticate,  Auth.authorise, blogController.updateBlog)
router.post("/blogs/:blogId",Auth.authenticate,  Auth.authorise, blogController.deletePost)
router.post("/blogs",Auth.authenticate, blogController.deletePostQuery)
router.get("/getBlogs",Auth.authenticate,blogController.getBlogs)


module.exports = router;
