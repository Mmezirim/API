const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/commentModel');
const Blog = require('./models/blogModel');
const routes = require('./routes/blogRoutes');
const app = express(); 

// static requests
app.listen(3000, (req, res)=>{
    console.log('server running on port 3000')
})
app.set ('view engine', 'ejs', 'HTML'); 
const mongoURI = 'mongodb+srv://Kevin:Chibuoyim@cluster0.qyty0yo.mongodb.net/Kevin?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connect;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.use(express.json());

//GET and POST requests

app.get('/', (req,res)=>{
    res.redirect('/blogs');
}); 

app.get('/blogs/:id/comments', async (req,res)=>{
    const blogId = req.params.id;
    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error: 'Blog post was not found'});
        }
        const comments = blog.comments;
        res.status(200).json(comments);
    }
    catch(error){
        res.status(500).json({error:'internal server error'});
    }
});   


app.post('/blogs/:id/comments', async (req, res) => {
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

app.use((req,res) =>{
     res.status(404).render('404', {title: '404'}) 
});