const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    linkedInId:{
        type: String,
        required: true,
        unique: true
    },
    twitterId:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    access: String,
},{Timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User
