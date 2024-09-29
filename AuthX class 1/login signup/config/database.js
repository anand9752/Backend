

const mongoose = require("mongoose");

require("dotenv").config();


exports.connect = () =>{

    mongoose.connect(process.env.MONGODB_URL ,{

    } 

    ).then(()=>{
        console.log("connected to db")
    }).catch((err)=>{
        console.log("db connection issue: " + err.message);
        process.exit(1);
    });
}