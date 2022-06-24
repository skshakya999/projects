const jwt = require("jsonwebtoken");
const BlogModel = require("../models/blogModel");
const validate = require("../validations/validate")




const authorise = async function(req,res,next){

    const token = req.headers["x-api-key"];

    if (!token) res.status(404).send({ status: false, msg: "Token not found" })

    const blogId = req.params.blogId

    const valid = validate.validId(blogId)

    if(!valid) return res.status(400).send({status:false,msg:"Invalid blog Id"})
    
    if(blogId){
        let blogdata = await BlogModel.findById(blogId)
        if(blogdata.isDeleted=='true') return res.status(404).send({status:false,msg:'No such blog found'})

        var author=blogdata.authorId
    }

    else{
        var author = req.query.authorid
    }
    
    let decodeToken = jwt.verify(token, 'group No-12')

    if(decodeToken.authorId != author) return res.status(401).send({status:false,msg:"Unauthorise access"})
    next()
}

module.exports.authorise=authorise