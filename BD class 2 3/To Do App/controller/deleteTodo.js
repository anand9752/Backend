
const Todo = require('../models/Todo');




exports.deleteTodo = async (req,res) =>{
    try {
       const {id} = req.params
      await Todo.findByIdAndDelete(id);

      res.json({
        success: true,
        message: 'Todo Deleted Successfully'
      })
    } catch (err) {
     
    console.log(err);
    
    res.status(500).json({
        success: false,
        message: 'Server Error',
        err:err.message
    })


}

}