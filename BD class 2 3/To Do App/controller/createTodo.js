

//import the model
const Todo =  require('../models/Todo')


// define route handler

exports.createTodo = async (req, res) => {
    try{
        //extract title and descrition from request body
        const {title,description} = req.body;

        //create a new todo object and insert into database
        // creating document object using create method
        const response = await Todo.create({title,description});
        
        //send a json response with a success message

        res.status(200).json({
            success: true,
            message: 'entry created successfully',
            data: response
        })

    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal error",
            message: err.message
        })
    }

}