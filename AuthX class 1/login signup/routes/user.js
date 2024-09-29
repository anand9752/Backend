

const express = require('express');

const router = express.Router();

const{auth, isStudent , isAdmin} = require("../middleware/autho")
const{ signup ,login} = require("../controller/auth")



//router.post('/login', login);]]]

router.post('/signup', signup);
router.post('/login', login);

router.get("/test" , auth , (req,res) =>{
    res.json({
        success:true,
        message: 'Access granted for all users this is protected route',
        user: req.user
    });
 }); 

//protected routes

router.get('/student', auth, isStudent, isAdmin, (req, res) => {
    res.json({
        success:true,
        message: 'Access granted for students this is protected route for stundent',
        user: req.user
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message: 'Access granted for students this is protected route for admin',
        user: req.user
    });

})


module.exports = router;