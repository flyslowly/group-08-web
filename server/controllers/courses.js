var express = require('express');
var router = express.Router();
var Course = require('../models/course')

// Return a list of all courses
router.get('/', function(req, res, next) {
    Course.find(function(err, courses) {
        if (err) { return next(err); }
        res.json({'courses': courses});
    });
});

// Create a new course
router.post('/', function(req, res, next) {
    var course = new Course(req.body);
    course.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(course);
    });
});

// Delete the courses collection
router.delete('/', function(req, res, next) {
    Course.remove(function(err, courses) {
        if (err) { return next(err); }
        res.json({'courses': courses});
    });
});

// Return the course with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
        if (err) { return next(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
        }
        res.json(course);
    });
});

// Update the course with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
        if (err) { return next(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
        }
        course.courseId = req.body.courseId;
        course.name = req.body.name;
        course.date = req.body.date;
        course.location = req.body.location;

        course.save();
        res.json(course);
    });
});

// Partially update the course with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
        if (err) { return next(err); }
        if (course == null) {
            return res.status(404).json({"message": "Course not found"});
        }
       
        course.courseId = (req.body.courseId || course.courseId);
        course.name = (req.body.name || course.name);
        course.date = (req.body.date || course.date);
        course.location = (req.body.location || course.location);
        
        course.save();
        res.json(course);
    });
});

// Delete the course with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Course.findOneAndDelete({_id: id}, function(err, course) {
        if (err) { return next(err); }
        if (course === null) {
            return res.status(404).json({'message': 'Course not found'});
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
