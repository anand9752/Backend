


const express = require('express');

const router = express.Router();


//import the contrlloer
const {dummyLink,likepost} = require('../controller/likeController')
const {createComment} = require('../controller/commentController');
const {createPost, getAllPosts} = require('../controller/postController');

//mapping 

router.post("/create" , createComment);
router.post("/posts/create", createPost);

router.get("/posts/all", getAllPosts);
router.post("/likes/like", likepost);
//export

module.exports = router;