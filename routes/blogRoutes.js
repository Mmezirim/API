const express = require('express');
const route = express.Router();
const Blog = require('../models/blogModel');
const { json } = require('body-parser');


route.get('/blogs/create', (req,res)=>{
    res.status(200).json(
        'Create new blog'
    );
}); 

route.get('/blogs', (req, res) =>{
    Blog.find().sort({createdAt: -1})
    .then((result) =>{
        res.status(200).json({
            blogs:result
        });
    }).catch((err) => {
        console.log(err);
    })
})

route.get('/blogs/:id',(req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.status(200).json({blog: result});
    })
    .catch((err) => {
        console.log(err);
    });
})

route.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        concoler.log(err);
    })
});

module.exports = route;