const jwt = require("jsonwebtoken");
const BlogModel = require("../models/blogModel");
const validate = require("../validations/validate")


const authenticate = function(req,res,next){
    try{
    const token = req.headers["x-api-key"];

    if (!token) res.status(400).send({ status: false, msg: "Token is required" })

    let decodeToken = jwt.verify(token, 'group No-12')

    if(!decodeToken) return res.status(401).send({status:false,msg:"Unauthorise access///"})

    console.log(decodeToken.authorId)

    next()
}
catch(err){
    res.status(400).send({status:false,msg:err.message})
}
}

const authorise = async function(req,res,next){

    const token = req.headers["x-api-key"];

    if (!token) res.status(400).send({ status: false, msg: "Token is required" })

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
module.exports.authenticate=authenticate
module.exports.authorise=authorise
