const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const PublisherModel= require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
   let auth = book.author
   let publish = book.publisher

   if(!auth || !publish) return res.send("Author id and publisher id are mendetory!")

   let author_id = await authorModel.findById(auth)

   let publisher_id = await PublisherModel.findById(publish)
   
  
   if(publisher_id==null) return res.send("No such publisher found")
   if(author_id==null) return res.send("No such author found")
  
    let bookCreated = await bookModel.create(book)
   
    res.send({data: bookCreated})
}

const updateBooksData= async function (req, res) {

    let book = req.body
    let bookUpdated = await bookModel.updateOne(book)
   
    res.send({data: bookUpdated})
}

const updateBooksPrice= async function (req, res) {

    

    let bookUpdatedData = await bookModel.updateMany({"ratings":{$gt:3.5}},{$inc:{price:10}})
   
    res.send({data: bookUpdatedData})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate("author").populate("publisher")
    res.send({data: specificBook})

}

module.exports.createBook= createBook
module.exports.updateBooksData= updateBooksData
module.exports.updateBooksPrice= updateBooksPrice
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
