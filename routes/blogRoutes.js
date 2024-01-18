const express = require('express');
const route = express.Router();
const Blog = require('../models/blogModel');
const bodyParser = require('body-parser');

route.get('/blogs/create', (req,res)=>{
    res.render('newBlog', {title: 'Create a new blog'});
}); 
route.post('/api/blogs', (req, res) =>{
    const { title, snippet, body, image, hashtags, tagOne, tagTwo, tagThree, tagFour, tagFive, tagSix, author, readMins, categories, comments} = req.body;
    const blog = new Blog({ title, snippet, body, image, hashtags, tagOne, tagTwo, tagThree, tagFour, tagFive, tagSix, author, readMins, categories, comments});
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
       );
       res.status(200).json(updatedBlog);
    }catch(err){
      res.status(200).json(err)
     }
    } else{
      res.status(401).json('You can only update your blog');
      }
}catch(err){
      res.status(500).json(err)
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
    const comment = req.body.comments;

    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error: 'Blog post was not found'})
        }
        blog.comments.push(comment);
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

route.post('/blogs/:blogId/comments/:commentId/reply', async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.replies.push({
      replier: req.body.replier,
      text: req.body.text,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


route.get('/blogs/:blogId/comments/:commentId/replies', async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const replies = comment.replies;
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

route.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = route;
