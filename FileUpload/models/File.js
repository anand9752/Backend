const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
require("dotenv").config();

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    tags:{
        type: String
    },
    email:{
        type: String
        
    }

}) 

fileSchema.post("save" , async function(doc){

    try {
        console.log("doc",doc);

        //create a transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS},


        })

        //send mail
        let info = await transporter.sendMail({
            from: 'your-email@example.com', // sender address
            to: doc.email, // list of receivers
            subject: 'New File Uploaded on Cloudinary', // Subject line
            text: `New File uploaded with name: ${doc.name}, Image URL: ${doc.imageUrl}, Tags: ${doc.tags}`, // plain text body
            html:`<h2>File Uploaded on Cloudinary</h2> view here : <a href="${doc.imageUrl}"> ${doc.imageUrl}</a> `

        })

        console.log("Message sent: %s", info);



    } catch (error) {
        
        console.log("Error saving document", error);

    }
})


module.exports = mongoose.model('File', fileSchema)