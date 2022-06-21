const BlogModel= require("../models/blogModel")

const createBlog= async function (req, res) {
    let blog = req.body
    let authorCreated = await BlogModel.create(blog)
    res.send({data: authorCreated})
}

module.exports.createBlog= createBlog