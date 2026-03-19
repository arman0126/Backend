const express = require("express");
const postrouter = express.Router()
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");


postrouter.post("/", upload.single("image"),identifyUser, postController.createPostController)


postrouter.get("/",identifyUser, postController.getPostController)


postrouter.get("/details/:postId", identifyUser, postController.getPostDetails)



module.exports = postrouter;