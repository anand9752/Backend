

const mongoose = require('mongoose');


require("dotenv").config();

const connectWithDb = ()=> {

    mongoose.connect(
        process.env.DATABASE_URL, {
        
        
        }
        )
        .then(
            console.log("db connection established")
        )
        .catch(err => {
         
            console.log("db failed to connect")
            console.log(err)
            process.exit(1); 
        });

}



module.exports = connectWithDb;