const express = require("express");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/articles');
    },
    filename: function (req, file, cb) {
        cb(null, `article${Date.now()}${file.originalname}`);
    }
});
const uploads = multer({ storage: storage });
const ArticleController = require("../controllers/article");

// Useful route
router.post("/create", ArticleController.create);
router.get("/articles", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getOneArticle);
router.delete("/article/:id", ArticleController.deleteArticle);
router.put("/article/:id", ArticleController.updateArticle);
router.post("/upload-image/:id", [uploads.single("file")], ArticleController.uploadImg);
router.get("/image/:file", ArticleController.showImage);
router.get("/search/:browse", ArticleController.browser);
module.exports = router;
