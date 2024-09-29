


const express = require('express');


const router = express.Router();

//impoprt controller
const {createTodo} = require('../controller/createTodo')
const {getTodo,getTodobyId} = require('../controller/getTodo')
const {updateTodo} = require('../controller/updateTodo')
const {deleteTodo} = require('../controller/deleteTodo')



//define API routes
// mapping of controller for  particular routes
router.post('/createTodo',createTodo);
router.get('/getTodos',getTodo);

router.get('/getTodobyId/:id',getTodobyId);

router.put('/updateTodo/:id',updateTodo);

router.delete('/deleteTodo/:id',deleteTodo);

module.exports = router;  