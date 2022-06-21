const AuthorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let authorCreated = await AuthorModel.create(author)
        res.send({ data: authorCreated })
    }
    catch (err) {
        res.status(400).send({ status: false, error: err })
    }
}
   

    module.exports.createAuthor = createAuthor
  