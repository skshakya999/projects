const BlogModel = require("../models/blogModel");
const mongoose = require('mongoose');
const Validate = require('../validations/validate')



const createBlog = async function (req, res) {
    let blog = req.body
    let authorid = blog.authorId
    let authorCreated = await BlogModel.create(blog)

    res.status(200).send({ data: authorCreated })
}

const getBlogs = async function (req, res) {
    try {
        const filterQuery = { isDeleted: false, isPublished: true }
        const queryParams = req.query

        if (Validate.isValidRequestBody(queryParams)) {
            const { authorId, category, tags, subcategory } = queryParams

            if (Validate.isValid(authorId,'string') && Validate.validId(authorId)) {
                filterQuery['authorId'] = authorId
            }

            if (queryParams.hasOwnProperty("category")) {
                if (!Validate.isValid(category,'string')) {
                    return res.status(400).send({ status: false, message: " Blog category should be in valid format", });
                }
                filterQuery["category"] = category.trim();
            }

            if (queryParams.hasOwnProperty("tags")) {
                if (Array.isArray(tags)) {
                    for (let i = 0; i < tags.length; i++) {
                        console.log(tags)
                        if (!Validate.isValid(tags[i],'string')) {
                            return res.status(400).send({ status: false, message: " Blog tags must be in valid format", });
                        }
                        filterQuery["tags"] = tags[i].trim();
                    }
                } else {console.log(tags)
                    if (!Validate.isValid(tags,'string')) {
                        return res.status(400).send({ status: false, message: " Blog tags must be in valid format", });
                    }
                    filterQuery["tags"] = tags.trim();
                }
            }

            if (queryParams.hasOwnProperty("subcategory")) {
                if (Array.isArray(subcategory)) {
                    for (let i = 0; i < subcategory.length; i++) {
                        if (!Validate.isValid(subcategory[i],'string')) {
                            return res.status(400).send({ status: false, message: " Blog subcategory is not valid", });
                        }
                        filterQuery["subcategory"] = subcategory[i].trim();
                    }
                } else {
                    if (!Validate.isValid(subcategory,'string')) {
                        return res.status(400).send({ status: false, message: " Blog subcategory is not valid", });
                    }
                    filterQuery["subcategory"] = subcategory.trim();
                }
            }



            const blogs = await BlogModel.find(filterQuery)

            if (Array.isArray(blogs) && blogs.length === 0) {
                return res.status(404).send({ status: false, message: "no such blog found" })

            }
            res.status(200).send({ status: true, message: 'Blog List', data: blogs })

        } else (
            res.status(400).send({ status: false, message: 'Please enter valid query' })
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: "failed", message: err.message })
    }


}





const updateBlog = async function (req, res) {

    try {
        const blogId = req.params.blogId


        if (!Validate.validId(blogId)) return res.status(400).send({ status: false, msg: "Invalid blog id!" })

        let data = req.body
        let updateData ={}

        if (Validate.isValidRequestBody(data)) {

            const{ title,body,authorId,tags,category,subcategory,deletedAt,isDeleted,publishedAt,isPublished} = data
            
            

            if (Validate.validId(authorId)){

                updateData['authorId']=authorId
            }else{
                return res.status(400).send({ status: false, msg: "Invalid author id!" })
            }

            if (data.hasOwnProperty("title")) {
                if (!Validate.isValid(title ,"string")) {
                    return res.status(400).send({ status: false, message: " Blog title should be in valid format"});
                }
                updateData["title"] = title
            }

            if (data.hasOwnProperty("body")) {
                if (!Validate.isValid(body,"string")) {
                    return res.status(400).send({ status: false, message: " Blog body should be in valid format"});
                }
                updateData["body"] = body.trim();
            }

            if (data.hasOwnProperty("category")) {
                if (!Validate.isValid(category,"string")) {
                    return res.status(400).send({ status: false, message: " Blog category should be in valid format"});
                }
                updateData["category"] = body.trim();
            }

            if (data.hasOwnProperty("tags")) {
                if (Array.isArray(tags)) {
                    for (let i = 0; i < tags.length; i++) {
                        if (!Validate.isValid(tags[i],"string")) {
                            return res.status(400).send({ status: false, message: " Blog tags must be in valid format" });
                        }
                        updateData["tags"] = tags[i].trim();
                    }
                } else {
                    if (!Validate.isValid(tags,"string")) {
                        return res.status(400).send({ status: false, message: " Blog tags must be in valid format" });
                    }
                    updateData["tags"] = tags.trim();
                }
            }

            if (data.hasOwnProperty("subcategory")) {
                if (Array.isArray(subcategory)) {
                    for (let i = 0; i < subcategory.length; i++) {
                        if (!Validate.isValid(subcategory[i],"string")) {
                            return res.status(400).send({ status: false, message: " Blog subcategory is not valid" });
                        }
                        updateData["subcategory"] = subcategory[i].trim();
                    }
                } else {
                    if (!Validate.isValid(subcategory,"string")) {
                        return res.status(400).send({ status: false, message: " Blog subcategory is not valid" });
                    }
                    updateData["subcategory"] = subcategory.trim();
                }
            }

            if (data.hasOwnProperty("isDeleted")) {
                if (!Validate.isValid(isDeleted,"boolean")) {
                    return res.status(400).send({ status: false, message: " isDeleted not a boolean value"});
                }
                updateData["isDeleted"] = isDeleted
            }

            if (data.hasOwnProperty("isPublished")) {
                if (!Validate.isValid(isPublished,"boolean")) {
                    return res.status(400).send({ status: false, message: " isPublished not a boolean value" });
                }
                updateData["isPublished"] = isPublished
            }

            if (data.hasOwnProperty("deletedAt")) {
                if (!Validate.isValid(deletedAt,"string")) {
                    return res.status(400).send({ status: false, message: " deletedAt not in date formate"});
                }
                updateData["deletedAt"] = deletedAt
            }
            



            let updatedData = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, updateData, { new: true })
            if (!updatedData) return res.status(404).send({ status: false, msg: "No blog found!" })
            res.status(200).send({ blog: updatedData })
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
}



const deletePost = async function (req, res) {
    try {
        const blogId = req.params.blogId
        if (!Validate.validId(blogId)) return res.status(400).send({ status: false, msg: "Invalid blog id!" })

        let deletedData = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!deletedData) return res.status(404).send({ status: false, msg: "No blog found!" })
        res.status(200).send({ blog: deletedData })
    }
    catch (err) {
        res.status(400).send({ status: false, error: err.message })
    }
}

const deletePostQuery = async function (req, res) {

    try {
        let category = req.query.category
        let authorid = req.query.authorid
        let tag = req.query.tag
        let subcategory = req.query.subcategory
        let unpublished = req.query.unpublished


        if (!Validate.validId(authorid)) return res.status(400).send({ status: false, msg: "Invalid author id!" })
        let deletedData = await BlogModel.findOneAndUpdate({ category: category, authorId: authorid, tags: tag, subcategory: subcategory, isPublished: unpublished }, { isDeleted: true }, { new: true })
        if (!deletedData) return res.status(404).send({ status: false, msg: "No blog found!" })
        res.status(200).send({ blog: deletedData })
    }
    catch (err) {
        res.status(400).send({ status: false, error: err })
    }


}


module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog
module.exports.deletePost = deletePost
module.exports.deletePostQuery = deletePostQuery
module.exports.getBlogs = getBlogs
