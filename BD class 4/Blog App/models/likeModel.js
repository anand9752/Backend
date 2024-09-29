
const mongoose = require('mongoose')



//route handler

const likeSchema = mongoose.Schema({

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',  // reference to post model
    },
    user:{
        type:String,
        required:true
    },


})


module.exports = mongoose.model("Like" , likeSchema);