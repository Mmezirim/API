const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsLetter = new Schema({
    email: String,
    name: String,
    videoLink: String,
    title: String,
},{timestamps: true});

const Mail = mongoose.model('Mail', newsLetter);
module.exports = Mail;