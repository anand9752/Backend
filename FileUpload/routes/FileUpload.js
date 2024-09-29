

const express = require('express')
const router = express.Router()


//fetchng all the controller 
const {localFileUpload , imageUpload,videoUpload,imageSizeReducer} = require("../controller/fileUpload")

//api route

router.post('/localFileUpload' , localFileUpload)
router.post('/imageUpload' ,imageUpload)

router.post('/videoUpload' , videoUpload)
router.post('/imageSizeReducer' , imageSizeReducer)




module.exports = router



