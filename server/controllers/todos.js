var express = require('express');
var router = express.Router();
var Todo = require('../models/todo')

// Return a list of all todos
router.get('/', function(req, res, next) {
    let sortby = req.query.sortBy || 'date';
    let orderby = req.query.orderBy || 'asc';
    
    Todo.find()
    .sort({[sortby]: orderby})
    .exec(function (err, todos) {
        if (err) { return next(err); }
        res.json({'todos': todos});
    });
});

// Create a new todo
router.post('/', function(req, res, next) {
    var todo = new Todo(req.body);
    todo.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(todo);
    });
});

// Delete the todos collection
router.delete('/', function(req, res, next) {
    Todo.remove(function(err, todos) {
        if (err) { return next(err); }
        res.json({'todos': todos});
    });
});

// Return the todo with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (err) { return next(err); }
        if (todo === null) {
            return res.status(404).json({'message': 'Todo not found'});
        }
        res.json(todo);
    });
});

// Update the todo with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (err) { return next(err); }
        if (todo === null) {
            return res.status(404).json({'message': 'Todo not found'});
        }
        todo.title = req.body.title;
        todo.date = req.body.date;
        todo.description = req.body.description;
        todo.location = req.body.location;

        todo.save();
        res.json(todo);
    });
});

// Partially update the todo with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (err) { return next(err); }
        if (todo == null) {
            return res.status(404).json({"message": "Todo not found"});
        }
       
        todo.title = (req.body.title || todo.title);
        todo.date = (req.body.date || todo.date);
        todo.description = (req.body.description || todo.description);
        todo.location = (req.body.location || todo.location);
        
        todo.save();
        res.json(todo);
    });
});

// Delete the todo with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Todo.findOneAndDelete({_id: id}, function(err, todo) {
        if (err) { return next(err); }
        if (todo === null) {
            return res.status(404).json({'message': 'Todo not found'});
        }
        res.json(todo);
    });
});

// Error handler
router.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (router.get('env') === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

module.exports = router;
