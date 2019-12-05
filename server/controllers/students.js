var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Theme = require('../models/theme');
var Todo = require('../models/todo');


// Return a list of all students
router.get('/', function(req, res, next) {
    if (req.query.ssn == null){
        Student.find(function(err, students) {
            if (err) { return next(err); }
            res.json({'students': students});
        });
    } else {
        let findBySsn = req.query.ssn;

        Student.find({ssn: findBySsn}, function(err, student) {
            if (err) { return next(err); }
            if (student === null) {
                return res.status(404).json({'message': 'Student not found'});
            }
            res.json(student);
        })
    }
});

// Create a new student
router.post('/', function(req, res, next) {
    var student = new Student(req.body);
    student.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(student);
    });
});

// Delete the students collection
router.delete('/', function(req, res, next) {
    Student.remove(function(err, students) {
        if (err) { return next(err); }
        res.json({'students': students});
    });
});

// Return the student with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return next(err); }
        if (student === null) {
            return res.status(404).json({'message': 'Student not found'});
        }
        res.json(student);
    });
});

// Update the student with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return next(err); }
        if (student === null) {
            return res.status(404).json({'message': 'Student not found'});
        }
        student.ssn = req.body.ssn;
        student.fname = req.body.fname;
        student.lname = req.body.lname;
        student.sex = req.body.sex;

        student.save();
        res.json(student);
    });
});

// Partially update the student with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findById(id, function(err, student) {
        if (err) { return next(err); }
        if (student == null) {
            return res.status(404).json({"message": "Student not found"});
        }
       
        student.ssn = (req.body.ssn || student.ssn);
        student.fname = (req.body.fname || student.fname);
        student.lname = (req.body.lname || student.lname);
        student.sex = (req.body.sex || student.sex);
        
        student.save();
        res.json(student);
    });
});

// Delete the student with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Student.findOneAndDelete({_id: id}, function(err, student) {
        if (err) { return next(err); }
        if (student === null) {
            return res.status(404).json({'message': 'Student not found'});
        }
        res.json(student);
    });
});

// Create a new todo
router.post('/:student_id/todos', function(req, res, next) {
    var student_id = req.params.student_id;
    Student.findById(student_id, function(err, student){
        if (err) { return next(err)}
        if (student === null){
            return res.status(404).json({"message": "Student not found"});
        }
        student.save(function(err){
            if (err) { return next(err)}

            var todo = new Todo({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                location: req.body.location,
                student: student_id
            });
            todo.save(function(err) {
                if (err) { return next(err); }
                res.status(201).json(todo);
            });
        })
    })
});

//GET student's todo events with the given student id
router.get('/:student_id/todos', function(req, res, next) {
    var student_id = req.params.student_id;
    Todo.find({student:student_id}).exec(function(err, todos) {
        if (err) { return next(err); }
        if (todos === null) {
            return res.status(404).json({"message": "Todo events not found"});
        }
        res.json(todos);
    });
});

//GET student's todo event with the given student id and todo id
router.get('/:student_id/todos/:todo_id', function(req, res, next){
    var student_id = req.params.student_id;
    var todo_id = req.params.todo_id;
    Todo.find({_id:todo_id})
    .where('student').equals(student_id)
    .exec(function(err, todo){
        if (err) {return next(err);}
        if (todo === null){
            return res.status(404).json({"message": "Todo events not found"});
        }
        res.json(todo);
    });
});

//DELETE student's todo event with the given student id and todo id
router.delete('/:student_id/todos/:todo_id', function(req, res, next){
    var student_id = req.params.student_id;
    var todo_id = req.params.todo_id;
    Todo.findOneAndDelete({_id:todo_id})
    .where('student').equals(student_id)
    .exec(function(err, todo) {
        if (err) { return next(err); }
        if (todo == null) {
            return res.status(404).json({"message": "Todo not found"});
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
