var express = require('express');
var router = express.Router();
var Theme = require('../models/theme')

// Return a list of all themes
router.get('/', function(req, res, next) {
    Theme.find(function(err, themes) {
        if (err) { return next(err); }
        res.json({'themes': themes});
    });
});

// Create a new theme
router.post('/', function(req, res, next) {
    var theme = new Theme(req.body);
    theme.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(theme);
    });
});

// Delete the themes collection
router.delete('/', function(req, res, next) {
    Theme.remove(function(err, themes) {
        if (err) { return next(err); }
        res.json({'themes': themes});
    });
});

// Return the theme with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Theme.findById(id, function(err, theme) {
        if (err) { return next(err); }
        if (theme === null) {
            return res.status(404).json({'message': 'Theme not found'});
        }
        res.json(theme);
    });
});

// Update the theme with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Theme.findById(id, function(err, theme) {
        if (err) { return next(err); }
        if (theme === null) {
            return res.status(404).json({'message': 'Theme not found'});
        }
        theme.name = req.body.name;
        theme.color = req.body.color;

        theme.save();
        res.json(theme);
    });
});

// Partially update the theme with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Theme.findById(id, function(err, theme) {
        if (err) { return next(err); }
        if (theme == null) {
            return res.status(404).json({"message": "Theme not found"});
        }
       
        theme.name = (req.body.name || theme.name);
        theme.color = (req.body.color || theme.color);
        
        theme.save();
        res.json(theme);
    });
});

// Delete the theme with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Theme.findOneAndDelete({_id: id}, function(err, theme) {
        if (err) { return next(err); }
        if (theme === null) {
            return res.status(404).json({'message': 'Theme not found'});
        }
        res.json(theme);
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
