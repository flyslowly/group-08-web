var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var themeSchema = new Schema({
    name: { type: String},
    color: { type: String},
});

module.exports = mongoose.model('themes', themeSchema);
