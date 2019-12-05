var express = require('express');
var router = express.Router();
var Holiday = require('../models/holiday');

// Return a list of all holidays
router.get('/', function(req, res, next) {
    Holiday.find(function(err, holidays) {
        if (err) { return next(err); }
        res.json({'holidays': holidays});
    });
});

// Create a new holiday
router.post('/', function(req, res, next) {
    var holiday = new Holiday(req.body);
    holiday.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(holiday);
    });
});

// Return the holiday with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Holiday.findById(id, function(err, holiday) {
        if (err) { return next(err); }
        if (holiday === null) {
            return res.status(404).json({'message': 'Holiday not found'});
        }
        res.json(holiday);
    });
});

// Delete the holiday with the given ID
router.delete('/:id/cars/:id', function(req, res, next) {
    var id = req.params.id;
    Holiday.findOneAndDelete({_id: id}, function(err, holiday) {
        if (err) { return next(err); }
        if (holiday === null) {
            return res.status(404).json({'message': 'Holiday not found'});
        }
        res.json(holiday);
    });
});

// Delete the holidays collection
router.delete('/', function(req, res, next) {
    Holiday.remove(function(err, holidays) {
        if (err) { return next(err); }
        res.json({'holidays': holidays});
        // res.send("All holidays removed");
    });
});

// Update the holiday with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Holiday.findById(id, function(err, holiday) {
        if (err) { return next(err); }
        if (holiday === null) {
            return res.status(404).json({'message': 'Holiday not found'});
        }
        
        holiday.name = req.body.name;
        holiday.date = req.body.date;

        holiday.save();
        res.json(holiday);
    });
});

// Partially update the holiday with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Holiday.findById(id, function(err, holiday) {
        if (err) { return next(err); }
        if (holiday == null) {
            return res.status(404).json({"message": "Holiday not found"});
        }
       
        holiday.name = (req.body.name || holiday.name);
        holiday.date = (req.body.date || holiday.date);
        
        holiday.save();
        res.json(holiday);
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
