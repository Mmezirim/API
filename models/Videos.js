const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoUpload = new Schema({
    videoLink: String,
    title: String,
},{timestamps: true});

const VideoLinks = mongoose.model('VideoLinks', videoUpload);
module.exports = VideoLinks;
