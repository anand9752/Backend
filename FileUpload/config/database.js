

const mongoose = require('mongoose')

require("dotenv").config();

 exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
    
     
    }).then(console.log("DB connection established")
    )
    .catch((err)=>{
         console.log(err)
         console.log("Failed to connect to DB")
         process.exit(1)
 
    }) 

}