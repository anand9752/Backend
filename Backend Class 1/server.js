
//server instantiate
const express = require('express');
const app = express();

//used to parse req.body in express -> PUT or POST
// const bodyParser = require('body-parser');

//specifically parse JSON data and add it to request.Body object    
// app.use(bodyParser.json());

//activation of server of 8080 port
app.listen(8080 , ()=>{
    console.log('server is running on port 3000');
})


app.get('/', (request, response) => {
    response.send('hello jeee , Kya hall chal,jaiaa');
})


app.post('/api/cars' , (request, response) => {
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    response.send("car submitted successfully");

})

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mahindra", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
   
    
})
.then(()=>{
    console.log("database connected");
}).catch(err => {
    console.log(err);
});