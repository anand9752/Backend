

// auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.auth = (req ,res , next) => {

try {
    // extract jwt token
// other way to fetch token
  // const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    // const token = req.cookies.token; // cookies token
 // const token = req.query.token; // query parameter token
//  console.log(req.cookies.token);
//  const token =  req.cookies.token ;
    const token = req.header('Authorization').replace('Bearer ' ,'');

 if(!token){
    return res.json({
        success: false,
        message: "Token not provided"
    })
 }

 //verify the token

 try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // console.log(decoded);
    req.user = decoded;
 } catch (err){
    return res.status(401).
        json( {
            success: false,
            message: "Token is not valid"
        })
    
 }
 next();

} catch (error) {
    return res.status(409).json({
        success: false,
        message: "Internal Server Error"
    })
}
}



exports.isStudent = (req, res, next) => {


    try {
        if(req.user.role != student){
            return res.status(403).json({
                success: false,
                message: "You are not a student"
            })
        }
        next();
    } catch (error) {
     return res.status(503).json({  
        
        success: false,
        message: "Internal Server Error"

    })
}
}



exports.isAdmin = (req, res, next) => {


    try {
        if(req.user.role != admin ){
            return res.status(403).json({
                success: false,
                message: "You are not a admin"
            })
        }
        next();
    } catch (error) {
     return res.status(503).json({  
        
        success: false,
        message: "Internal Server Error"

    })
}
}