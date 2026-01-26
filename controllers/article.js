const { validateArticle } = require("../utils/validate");
const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");

const create = (req, res) => {
    // Pick parameters per POST to save
    let parameters = req.body;
    // Validate data
    try {
        validateArticle(parameters);
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            msg: "Missing data to send."
        })
    }
    // Create object to save
    const article = new Article(parameters);
    // Assign values to object based on model (manual or automatic)

    // Save article on DB
    article.save().then(savedArticle => {
        // Return results
        return res.status(200).json({
            status: "success",
            article: savedArticle,
            msg: "Article was saved successfully!"
        });
    }).catch(() => { // error variable is not used, can be omitted
        return res.status(404).json({
            status: "Error",
            msg: "Article wasn't saved."
        });
    });
}

const getArticles = (req, res) => {
    let query = Article.find({});
    let params = req.query.params;
    query.sort({ date: -1 }).exec().then(articles => {
        return res.status(200).send({
            status: "success",
            urlParam: params,
            articlesLength: articles.length,
            articles
        });
    }).catch(() => {
        return res.status(404).json({
            status: "Error",
            msg: "Articles weren't found."
        });
    });
}

const getOneArticle = (req, res) => {
    // Pick an id with URL
    let id = req.params.id;
    // Find the article
    Article.findById(id).then(article => {
        return res.status(200).json({
            status: "success",
            article
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            msg: "Article not found."
        });
    });
}

const deleteArticle = (req, res) => {
    let articleId = req.params.id;
    Article.findOneAndDelete({ _id: articleId }).then((deletedArticle) => {
        return res.status(200).json({
            status: "success",
            article: deletedArticle,
            msg: "Deleted article successfully."
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            msg: "Error deleting article."
        });
    });
}

const updateArticle = (req, res) => {
    // Pick id
    let articleId = req.params.id;
    // Pick data from body
    let parameters = req.body;
    // Validate data
    try {
        validateArticle(parameters);
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            msg: "Missing data to send."
        })
    }
    // Search and update article
    Article.findOneAndUpdate({ _id: articleId }, parameters, { new: true }).then((updatedArticle) => {
        // Return result
        return res.status(200).json({
            status: "success",
            article: updatedArticle,
            msg: "Updated article successfully."
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            msg: "Error while updating."
        })
    });
}

const uploadImg = (req, res) => {
    // Retrieve the uploaded image file
    if (!req.file) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid operation, no file selected."
        })
    }
    // Get the file name
    let fileName = req.file.originalname;
    // Get the file extension (jpg, png, etc...)
    let fileSplit = fileName.split("\.");
    let fileExtension = fileSplit[1];
    console.log(fileExtension);
    // Validate proper file extension
    if (fileExtension != "png" && fileExtension != "jpg" &&
        fileExtension != "jpeg" && fileExtension != "gif") {
        // Delete file and return response
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                msg: "Invalid file extension."
            })
        });
    } else {
        // Pick id
        let articleId = req.params.id;
        // Search and update article
        Article.findOneAndUpdate({ _id: articleId }, { image: req.file.filename }, { new: true }).then((updatedArticle) => {
            // Return result
            return res.status(200).json({
                status: "success",
                article: updatedArticle,
                uploadedImageData: req.file,
                msg: "Updated article with image successfully."
            });
        }).catch(() => {
            return res.status(404).json({
                status: "error",
                msg: "Error while updating."
            })
        });
    }
}

const showImage = (req, res) => {
    let imageFile = req.params.file;
    let imagePath = `./images/articles/${imageFile}`;
    console.log(imagePath);
    fs.stat(imagePath, (error, exists) => {
        if (exists) {
            return res.sendFile(path.resolve(imagePath));
        } else {
            return res.status(404).json({
                status: "error",
                msg: "Image doesn't exist.",
                exists,
                imageFile,
                imagePath
            });
        };
    });
}

const browser = (req, res) => {
    // Get search string
    let browse = req.params.browse;
    // Find OR
    Article.find({
        "$or": [
            { "title": { "$regex": browse, "$options": "i" } },
            { "content": { "$regex": browse, "$options": "i" } }
        ]
    })
        .sort({ date: -1 })
        .exec().then((articlesFound) => {
            return res.status(200).json({
                status: "success",
                articles: articlesFound
            });
        }).catch(() => {
            return res.status(404).json({
                status: "error",
                msg: "Articles not found."
            });
        });
}

module.exports = {
    create,
    getArticles,
    getOneArticle,
    deleteArticle,
    updateArticle,
    uploadImg,
    showImage,
    browser
};