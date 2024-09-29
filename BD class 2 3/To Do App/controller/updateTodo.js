
const Todo = require('../models/Todo');




exports.updateTodo = async (req,res) =>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;
 
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, updatedAt: Date.now() },
            { new: true }
        );
 
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
 
        res.status(200).json({
            success: true,
            data: todo,
            message: 'Todo Updated Successfully'
        });
    } catch (err) {
     
    console.log(err);
    
    res.status(500).json({
        success: false,
        message: 'Server Error',
        err:err.message
    })


}

}