const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },Hashtags: {
        type: String,
        required: true
    },Tags: {
        type: [String],
        required: true
    },Author: {
        type: String,
        required: true
    },ReadMins: {
        type: String,
        required: true
    },
    comments:[
        {
            commenter: String,
            text: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', devSchema);

module.exports = Blog;