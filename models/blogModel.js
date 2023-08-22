const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    snippet:{
        type: String,
        required: false
    },
    body: mongoose.Schema.Types.Mixed,
    image: {
        type: String,
        required: false
    },
    hashtags: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    author: {
        type: String,
        required: false
    },readMins: {
        type: String,
        required: false
    },categories: {
        type: String,
        required: false
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
