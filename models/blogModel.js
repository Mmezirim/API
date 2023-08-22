const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
  title: String,
  snippet: String,
  body: mongoose.Schema.Types.Mixed,
  image: String,
  hashtags: String,
  tag 1: String,
  tag 2: String,
  tag 3: String,
  tag 4: String,
  tag 5: String,
  tag 6: String,
  author: String,
  readMins: String,
  categories: String,
  comments: [{ commenter: String, text: String }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', devSchema);

module.exports = Blog;
