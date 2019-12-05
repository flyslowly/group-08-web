var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: { type: String, required: true},
    date: { type: String, required: true},
    description: {type: String, max: 150},
    location: {type: String},
    student: {type: Schema.Types.ObjectId, ref:'students'},
    teacher: {type: Schema.Types.ObjectId, ref:'teachers'}
});

module.exports = mongoose.model('todos', todoSchema);
