
const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect =  () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        
    })
   .then(() => console.log('MongoDB Connected...'))
   .catch(err => {
    console.log("Issue in db connection")
    console.log(err.message);
    process.exit(1);

     }
     );
}


module.exports = dbConnect;