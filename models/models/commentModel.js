const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTwo = new Schema({
    author:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', schemaTwo);
module.exports = Comment;