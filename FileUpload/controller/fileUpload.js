


const express = require('express');
const File = require('../models/File')
const cloudinary = require("cloudinary").v2


//localFileUpload ke liye handler function likhna h
exports.localFileUpload = async (req , res )=> {

    try {
        const file = req.files.file;
        console.log(file);
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}` ;
        console.log("path -> " , path);
        

        file.mv(path, async (err) => {
            if (err) {
                console.error(err);
                 res.status(500).json(
                    {
                        success: true,
                        message: 'File uploaded successfully',
                        
                    }
                 )
            }
        })
        
    } catch (error) {
        console.error(error);
    }
}
function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type.toLowerCase());
}
async function uploadFileToCloudinary(file, folder){
    const options = {folder }
    options.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath, options)
}
async function uploadFileToCloudinary2(file, folder,quality){
    const options = {folder }
    options.resource_type = "auto"
    options.quality = quality
   return await cloudinary.uploader.upload(file.tempFilePath, options)
}
exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const{name ,tags, email} = req.body;
        console.log(name,tags,email);
         

        const file = req.files.imageFile;
        console.log(file);
         

        //validation supported or not
       const supportedTypes = ["png", "jpg", "jpeg"];
       const fileType = file.name.split(".")[1].toLowerCase();

       if (!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({ 
                success: false,
                message: "Unsupported file type" });
       }


       //file formate supported hai
       //we have to upload at cloudinary 
       const response = await uploadFileToCloudinary(file , "Coder Clan");
       console.log(response);
       

       //db me entry save krni hai

       const dpFileData = await File.create({
        name,
        email,
        tags,
        imageUrl: response.secure_url,
        
        

       })





       res.json({
        success: true,
        message: 'Image uploaded successfully',
        url : response.secure_url
       })




        

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured while uploading image'
        })
    }
}


exports.videoUpload =  async (req,res) => {
    try {
        
    //data fetch
    const {name ,tags, email} = req.body;
    console.log(name,tags,email);
   

    const file = req.files.videoFile;
    console.log(file); 


      //validation supported or not
      const supportedTypes = ["mp4" , "mov"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if (!isFileTypeSupported(fileType,supportedTypes)) {
           return res.status(400).json({ 
               success: false,
               message: "Unsupported file type" });
      }


      //file formate supported hai
      //we have to upload at cloudinary 
      const response = await uploadFileToCloudinary(file , "Coder Clan");
      console.log(response);


      //db me entry save krni hai

      const dpFileData = await File.create({
        name,
        email,
        tags,
        imageUrl: response.secure_url
       })





       res.json({
        success: true,
        message: 'Video uploaded successfully',
        url : response.secure_url
       })


   } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occured while uploading video'
        })
    }
}




exports.imageSizeReducer = async (req, res) => {

    try {
        
        //data fetch
        const {name ,tags, email} = req.body;
        console.log(name,tags,email);
       
    
        const file = req.files.imageFile;
        console.log(file); 
    
    
          //validation supported or not
          const supportedTypes = ["png", "jpg", "jpeg"];
          const fileType = file.name.split(".")[1].toLowerCase();
    
          if (!isFileTypeSupported(fileType,supportedTypes)) {
               return res.status(400).json({ 
                   success: false,
                   message: "Unsupported file type" });
          }
    
    
          //file formate supported hai
          //we have to upload at cloudinary 
          const response = await uploadFileToCloudinary2(file , "Coder Clan" , 10);
          console.log(response);
    
    
          //db me entry save krni hai
    
          const dpFileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
           })
    
    
    
    
    
           res.json({
            success: true,
            message: 'reduced file uploaded successfully',
            url : response.secure_url
           })
    
    
       } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error occured while uploading reducing file'
            })
        }
}