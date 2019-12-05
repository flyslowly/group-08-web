var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseId: {type: String},
    name: {type: String},
    date: {type: String},
    location: {type: String},
    teacher: {type: Schema.Types.ObjectId, ref:'teachers'}
});

module.exports = mongoose.model('courses', courseSchema);
