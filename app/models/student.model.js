const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    studentid: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    course: {
        type: mongoose.Schema.ObjectId, ref: 'Course'
    },
    year: {
        type: String
    },
    created_at: {
        type: Date, default: Date.now
    },
    created_by: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    updated_at: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    updated_at:{
        type: Date,
    }
});

module.exports = mongoose.model('Student', studentSchema);