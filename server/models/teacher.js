var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    ssn: {type: Number, required: true, min: [100000000000, 'Invalid'], max: 999999999999},
    name: { fname: {type: String},
    lname: {type: String}
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'courses' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'todos' }],
    theme: { type: Schema.Types.ObjectId, ref: 'themes' },
    sex: { type: String, enum: ["Male", "Female", "Other",] }
});

module.exports = mongoose.model('teachers', teacherSchema);
