var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var holidaySchema = new Schema({
    name: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('holidays', holidaySchema);
