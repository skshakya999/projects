const PublisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    let Publisher = req.body
    let publisherCreated = await PublisherModel.create(Publisher)
    res.send({data: publisherCreated})
}

const getPublisherData= async function (req, res) {
    let publisher = await PublisherModel.find()
    res.send({data: publisher})
}

module.exports.createPublisher= createPublisher
module.exports.getPublisherData= getPublisherData