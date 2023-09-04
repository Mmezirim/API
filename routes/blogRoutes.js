const express = require('express');
const route = express.Router();
const Blog = require('../models/blogModel');
const bodyParser = require('body-parser');

route.get('/blogs/create', (req,res)=>{
    res.render('newBlog', {title: 'Create a new blog'});
}); 
route.post('/api/blogs', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then(() =>{
        res.status(200).json({message: 'Data saved sucessfully'});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error saving data'});
    })
});

route.put('/api/blogs/:id', async (req, res) => {
  try{
     const blog = await Blog.findById(req.params.id);
     if(blog.username === req.body.username){
      try{
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
      {$set: req.body},
      {new: true}
       };
       res.status(200).json(updatedBlog);
    }catch(err){
      res.status(200).json(err)
     }
    } else{
      res.status(200).json('You can only update your blog')
      }
}catch(err){
      res.status(200).json(err)
}
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
route.post('/blogs/:id/comments', async (req, res) => {
    const blogId = req.params.id;
    const {commenter, text} = req.body;

    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error: 'Blog post was not found'})
        }
        blog.comments.push({commenter, text});
        await blog.save();
        res.status(200).json(blog)
    }
    catch(error){
        res.status(500).json({error:'internal server error'})
    }
});

route.get('/blogs/:id/comments', async (req,res)=>{
    const blogId = req.params.id;
    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error: 'Blog post was not found'});
        }const comments = blog.comments;
        res.status(200).json(comments);
    }catch(error){
        res.status(500).json({error:'internal server error'});
    }
});
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
