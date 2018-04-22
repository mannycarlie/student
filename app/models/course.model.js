const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    courseid: {
        type: String
    },
    name: {
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

module.exports = mongoose.model('Course', courseSchema);