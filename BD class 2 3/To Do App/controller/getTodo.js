

//import the model
const Todo =  require('../models/Todo')


// define route handler

exports.getTodo = async (req, res) => {
    try{
        
        //fetch all todo items from database
        const todos = await Todo.find({})
        console.log(todos);

        //response 
        res.status(200).json({
            success: true,
            data: todos,
            message:"entire todo data is fetched"
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }

}






exports.getTodobyId = async (req, res) => {
    try{
        
        //fetch particular todo items through id from database
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});

        //data for given id not found in database

        if(!todo){
            return res.status(404).json({
                success: false,
                data: null,
                message: "data not found"
            })
        }

        //data for given id found
        res.status(200).json({
            success: true,
            data: todo,
            message:`todo at ${id} data is fetched`
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }

}