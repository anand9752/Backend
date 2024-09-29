

const express = require('express');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;


// middleware to parse json response

app.use(express.json());

//import routes for TODO api
const todoRoutes = require('./routes/todos');


//mount the routes
app.use('/api/v1', todoRoutes);


//start server
app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
})



//connect to database

const dbConnect = require('./config/database')

dbConnect();


app.get('/' , (req, res) =>{
    res.send(`<h1> this is home page </h1>`)
})

