const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.put("/updateBooksData", bookController.updateBooksData)

router.put("/updateBooksPrice", bookController.updateBooksPrice)

router.post("/createPublisher", publisherController.createPublisher)

router.get("/getPublisherData", publisherController.getPublisherData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;