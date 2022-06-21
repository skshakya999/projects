const BlogModel= require("../models/blogModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const createBlog= async function (req, res) {
    let blog = req.body
    let authorCreated = await BlogModel.create(blog)
    res.send({data: authorCreated})
}

const validId = function(ObjectId){ return mongoose.Types.ObjectId.isValid(ObjectId)}
const updateBlog = async function(req,res){

   try {
        const blogId = req.params.blogId
    if(!validId(blogId)) return res.status(400).send({status:false,msg:"Invalid blog id!"})
    let blog = await BlogModel.findOne({_id:blogId,isDeleted:false})
    if(!blog) return res.status(404).send({status:false,msg:"No blog found!"})

    let data = req.body

    let updatedData = await BlogModel.findOneAndUpdate({_id:blogId,isDeleted:false}, data,{new:true})
    res.status(200).send({blog:updatedData})
}
catch(err){
    res.status(400).send({error:err})
}
}


module.exports.createBlog= createBlog
module.exports.updateBlog= updateBlog