const BlogModel = require("../models/blogModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const createBlog = async function (req, res) {
    let blog = req.body
    let authorCreated = await BlogModel.create(blog)
    res.send({ data: authorCreated })
}

const validId = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }


const updateBlog = async function (req, res) {

    try {
        const blogId = req.params.blogId
        if (!validId(blogId)) return res.status(400).send({ status: false, msg: "Invalid blog id!" })
        let blog = await BlogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog) return res.status(404).send({ status: false, msg: "No blog found!" })

        let data = req.body

        let updatedData = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, data, { new: true })
        res.status(200).send({ blog: updatedData })
    }
    catch (err) {
        res.status(400).send({ error: err })
    }
}

const deletePost = async function (req, res) {
    try {
        const blogId = req.params.blogId
        if (!validId(blogId)) return res.status(400).send({ status: false, msg: "Invalid blog id!" })
       
        let deletedData = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!deletedData) return res.status(404).send({ status: false, msg: "No blog found!" })
        res.status(200).send({ blog: deletedData })
    }
    catch (err) {
        res.status(400).send({ status: false, error: err })
    }
}

const deletePostQuery = async function(req,res){
    
   try {
    let category =req.query.category
    let authorid =req.query.authorid
    let tag =req.query.tag
    let subcategory =req.query.subcategory
    let unpublished =req.query.unpublished
    

    if (!validId(authorid)) return res.status(400).send({ status: false, msg: "Invalid author id!" })
    let deletedData = await BlogModel.findOneAndUpdate({ category:category,authorId:authorid,tags:tag,subcategory:subcategory, isPublished: unpublished }, { isDeleted: true }, { new: true })
    if(!deletedData) return res.status(404).send({ status: false, msg: "No blog found!" })
    res.status(200).send({ blog: deletedData })
}
catch(err){
    res.status(400).send({ status: false,error:err })
}


}


module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog
module.exports.deletePost = deletePost
module.exports.deletePostQuery = deletePostQuery