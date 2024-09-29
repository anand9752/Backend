

const express = require('express');

const app = express();

require('dotenv').config();


// cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json());




require("./config/database").connect();



//route import and mount

const user = require("./routes/user"
)
app.use("/api/v1" ,user);



//activation

const PORT = process.env.PORT || 3000;
app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}`);
});


