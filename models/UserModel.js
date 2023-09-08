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
        unique: true
    },
    twitterId:{
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    profilePic: {
        type: String,
        default: ""
    },
},{Timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User
