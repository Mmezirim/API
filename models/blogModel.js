const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
  title: String,
  snippet: String,
  body: mongoose.Schema.Types.Mixed,
  image: String,
  hashtags: String,
  tags: [String],
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
