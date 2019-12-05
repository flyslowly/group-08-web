var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    ssn: {type: Number, required: true, min: [100000000000, 'Invalid'], max: 999999999999},
    name: { fname: {type: String},
    lname: {type: String}
    },
    theme: { type: Schema.Types.ObjectId, ref: 'themes' },
    todos: [{ type: Schema.Types.ObjectId, ref: 'todos' }],
    sex: { type: String, enum: ["Male", "Female", "Other",] }
});

module.exports = mongoose.model('students', studentSchema);
