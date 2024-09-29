
const brcypt = require("bcrypt");

const saltRounds = 10;
require("dotenv").config();
const User = require('../models/userdata');


const jwt = require('jsonwebtoken');

//signup route handler

exports.signup = async(req,res) =>{

try {
    //get data
    const {name,email,password,role} = req.body;
    //check if user is already exist
    const existing = await User.findOne({email});

    if(existing){
        return res.status(400).json({msg:"user already exist",
            success:false,
        },
            
        );
    }


    //secure password
    try {
        hashedPassword = await brcypt.hash(password,saltRounds);
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"error in hashing password",
         });
    }


    //create entry

    const userob = await User.create({

        name,
        email,
        password:  hashedPassword,
        role
    }) ;

  
    return res.status(200).json({
        success:true,
        message:"user created successfully",
        data:userob,
    })
    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"error in creating user",
    })
}

} 



//login

exports.login = async(req,res) =>{

    try {
        //data fetch
        const {email,password} = req.body;
        
        //validation on email and password
        if(!email ||!password){
            return res.status(400).json({
                success:false,
                message:"please provide email and password",
            })
        }


        //check if user exist
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user does not exist",
            })
        }

        //making payload
        const payload = {
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
         


        //check password
        const isMatch = await brcypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid password",
            })
        }else{
          
            //generate token
        let token  = jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                }
        )

        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
          expiresIn: new Date( Date.now() + 3*24*60*60*1000 ),
          
          httpOnly: true,
        }

        res.cookie("token",token , options).status(200).json({
            success:true,
            token,
            user,
            message:"user Logged in successfully"
        })
        



        } 
        
        //send response
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in login",
        })
    }
}