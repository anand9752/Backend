// app create krna h
const express = require('express')
const app = express()

//port find krna h


require('dotenv').config()

const PORT = process.env.PORT || 3000;

//middleware add krne h
app.use(express.json())
const fileUpload = require('express-fileupload')

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
))


//db se connect krna h

const dp = require('./config/database')
dp.connect()

//cloudinary se connect krna k

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect()


//api routes mount krna h
const Upload = require('./routes/FileUpload')

app.use('/api/v1/upload', Upload)



//activate sever

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})  
