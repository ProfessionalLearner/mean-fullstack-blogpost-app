const mongoose = require('mongoose');

const BlogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String, 
        requiered: true,
        enum: ['public', 'private'],
    },
    user: {                                     // by which user blogpost was written
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Blogpost', BlogpostSchema)