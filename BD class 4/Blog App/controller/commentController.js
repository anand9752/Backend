const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
    try {
        // Fetch data from req body
        const { post, user, body } = req.body;
        console.log(req.body);

        // Check for missing fields
        if (!post || !user || !body) {
            return res.status(400).json({ error: "Missing required fields: post, user, or body" });
        }

        // Create comment object
        const comment = new Comment({ post, user, body });

        // Save the new comment in the database
        const savedComment = await comment.save();

        // Find the post by Id and add the new comment to the comments array
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true, runValidators: true }
        ).populate('comments').exec();

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ post: updatedPost });
    } catch (error) {
        console.error('Error while updating comment:', error);
        return res.status(500).json({ error: "Error while updating comment", details: error.message });
    }
};
