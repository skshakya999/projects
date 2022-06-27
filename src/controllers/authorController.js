const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")


const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let authorCreated = await AuthorModel.create(author)
        res.send({ data: authorCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err })
    }
}


 const loginAuthor = async function (req,res){

    let authorDetail = req.body
    let email = authorDetail.email
    let password = authorDetail.password

    const loginData = await AuthorModel.findOne({email:email,password:password})
 

    if(!loginData) return res.status(404).send({status:false,msg:"No author found with these credentials"})

    
    let token = jwt.sign({
        emailId:email,
        pass:password,
        authorId:loginData._id.toString()
    },
    "group No-12"
    );

    res.setHeader("x-api-key",token)
    res.status(200).send({status:true,tok:token})
 }

    module.exports.createAuthor = createAuthor
    module.exports.loginAuthor = loginAuthor
  