var express = require('express');
var router = express.Router();
var Teacher = require('../models/teacher');
var Course = require('../models/course');
var Todo = require('../models/todo');

// Return a list of all teachers
router.get('/', function(req, res, next) {
    if (req.query.ssn == null){
        Teacher.find(function(err, teachers) {
            if (err) { return next(err); }
            res.json({'teachers': teachers});
        });
    } else {
        let findBySsn = req.query.ssn;

        Teacher.find({ssn: findBySsn}, function(err, teacher) {
            if (err) { return next(err); }
            if (teacher === null) {
                return res.status(404).json({'message': 'Teacher not found'});
            }
            res.json(teacher);
        })
    }
});

// Create a new teacher
router.post('/', function(req, res, next) {
    var teacher = new Teacher(req.body);
    teacher.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(teacher);
    });
});

// Delete the teachers collection
router.delete('/', function(req, res, next) {
    Teacher.remove(function(err, teachers) {
        if (err) { return next(err); }
        res.json({'teachers': teachers});
    });
});

// Return the teacher with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Teacher.findById(id, function(err, teacher) {
        if (err) { return next(err); }
        if (teacher === null) {
            return res.status(404).json({'message': 'Teacher not found'});
        }
        res.json(teacher);
    });
});

// Update the teacher with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Teacher.findById(id, function(err, teacher) {
        if (err) { return next(err); }
        if (teacher === null) {
            return res.status(404).json({'message': 'Teacher not found'});
        }
        teacher.ssn = req.body.ssn;
        teacher.fname = req.body.fname;
        teacher.lname = req.body.lname;
        teacher.sex = req.body.sex;

        teacher.save();
        res.json(teacher);
    });
});

// Partially update the teacher with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Teacher.findById(id, function(err, teacher) {
        if (err) { return next(err); }
        if (teacher == null) {
            return res.status(404).json({"message": "Teacher not found"});
        }
       
        teacher.ssn = (req.body.ssn || teacher.ssn);
        teacher.fname = (req.body.fname || teacher.fname);
        teacher.lname = (req.body.lname || teacher.lname);
        teacher.sex = (req.body.sex || teacher.sex);
        
        teacher.save();
        res.json(teacher);
    });
});

// Delete the teacher with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Teacher.findOneAndDelete({_id: id}, function(err, teacher) {
        if (err) { return next(err); }
        if (teacher === null) {
            return res.status(404).json({'message': 'Teacher not found'});
        }
        res.json(teacher);
    });
});

// Create a new todo
router.post('/:teacher_id/todos', function(req, res, next) {
    var teacher_id = req.params.teacher_id;
    Teacher.findById(teacher_id, function(err, teacher){
        if (err) { return next(err)}
        if (teacher === null){
            return res.status(404).json({"message": "Teacher not found"});
        }
        teacher.save(function(err){
            if (err) { return next(err)}

            var todo = new Todo({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                location: req.body.location,
                teacher: teacher_id
            });
            todo.save(function(err) {
                if (err) { return next(err); }
                res.status(201).json(todo);
            });
        })
    })
});

//GET teacher's todo events with the given teacher id
router.get('/:teacher_id/todos', function(req, res, next) {
    var teacher_id = req.params.teacher_id;
    Todo.find({teacher:teacher_id}).exec(function(err, todos) {
        if (err) { return next(err); }
        if (todos === null) {
            return res.status(404).json({"message": "Todo events not found"});
        }
        res.json({'todos':todos});
    });
});

//GET teacher's todo event with the given teacher id and todo id
router.get('/:teacher_id/todos/:todo_id', function(req, res, next){
    var teacher_id = req.params.teacher_id;
    var todo_id = req.params.todo_id;
    Todo.find({_id:todo_id})
    .where('teacher').equals(teacher_id)
    .exec(function(err, todo){
        if (err) {return next(err);}
        if (todo === null){
            return res.status(404).json({"message": "Todo event not found"});
        }
        res.json(todo);
    });
});

//DELETE teacher's todo event with the given teacher id and todo id
router.delete('/:teacher_id/todos/:todo_id', function(req, res, next){
    var teacher_id = req.params.teacher_id;
    var todo_id = req.params.todo_id;
    Todo.findOneAndDelete({_id:todo_id})
    .where('teacher').equals(teacher_id)
    .exec(function(err, todo) {
        if (err) { return next(err); }
        if (todo == null) {
            return res.status(404).json({"message": "Todo not found"});
          }
          res.json(todo);
    });
});

// Create a new course
router.post('/:teacher_id/courses', function(req, res, next) {
    var teacher_id = req.params.teacher_id;
    Teacher.findById(teacher_id, function(err, teacher){
        if (err) { return next(err)}
        if (teacher === null){
            return res.status(404).json({"message": "Teacher not found"});
        }
        teacher.save(function(err){
            if (err) { return next(err)}

            var course = new Course({
                courseId: req.body.courseId,
                name: req.body.name,
                date: req.body.date,
                location: req.body.location,
                teacher: teacher_id
            });
            course.save(function(err) {
                if (err) { return next(err); }
                res.status(201).json(course);
            });
        })
    })
});

//GET teacher's course events with the given teacher id
router.get('/:teacher_id/courses', function(req, res, next) {
    var teacher_id = req.params.teacher_id;
    Course.find({teacher:teacher_id}).exec(function(err, courses) {
        if (err) { return next(err); }
        if (courses === null) {
            return res.status(404).json({"message": "Courses not found"});
        }
        res.json({'courses':courses});
    });
});

//GET teacher's course event with the given teacher id and course id
router.get('/:teacher_id/courses/:course_id', function(req, res, next){
    var teacher_id = req.params.teacher_id;
    var course_id = req.params.course_id;
    Course.find({_id:course_id})
    .where('teacher').equals(teacher_id)
    .exec(function(err, course){
        if (err) {return next(err);}
        if (course === null){
            return res.status(404).json({"message": "Course not found"});
        }
        res.json(course);
    });
});

//DELETE teacher's course event with the given teacher id and course id
router.delete('/:teacher_id/courses/:course_id', function(req, res, next){
    var teacher_id = req.params.teacher_id;
    var course_id = req.params.course_id;
    Course.findOneAndDelete({_id:course_id})
    .where('teacher').equals(teacher_id)
    .exec(function(err, course) {
        if (err) { return next(err); }
        if (course == null) {
            return res.status(404).json({"message": "Course not found"});
          }
          res.json(course);
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
