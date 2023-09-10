const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
  title: String,
  snippet: String,
  body: mongoose.Schema.Types.Mixed,
  image: Buffer,
  hashtags: String,
  tagOne: String,
  tagTwo: String,
  tagThree: String,
  tagFour: String,
  tagFive: String,
  tagSix: String,
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
