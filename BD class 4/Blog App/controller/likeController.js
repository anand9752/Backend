//import models

const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post

exports.likepost = async (req,res)=>{
    try {
        const {post , user} = req.body;
        const like  = new Like ({
            post,user
        })

        const savedLike = await like.save();
          

        // update the post collection basis on this 
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true, runValidators: true }
        ).

        res.status(200).json({
            success: true,
            data: updatedPost
        })

    } catch (error) {
        
    }
}






exports.dummyLink = (req,res)=>{
    res.send("dummy link")
}