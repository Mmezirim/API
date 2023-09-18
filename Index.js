const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/UserModel');
const Blog = require('./models/blogModel');
const VideoLinks = require('./models/Videos');
const Mail = require('./models/newsletters');
const BlogRoutes = require('./routes/blogRoutes');
const AuthRoutes = require('./routes/DashAuth');
const MailRoutes = require('./routes/subscribeToNewsLetter');
const UserRoutes = require('./routes/Users');
const bodyParser = require('body-parser');
const app = express(); 

// static requests
app.set ('view engine', 'ejs', 'HTML'); 
const mongoURI = 'mongodb+srv://Kevin:Chibuoyim@cluster0.qyty0yo.mongodb.net/Kevin?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connect;
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(BlogRoutes);
app.use(AuthRoutes);
app.use(MailRoutes);
app.use(UserRoutes);

//GET and POST requests

app.get('/', (req,res)=>{
    res.redirect('/blogs');
}); 
app.use((req,res) =>{
     res.status(404).render('404', {title: '404'}) 
});

//LISTENING FOR REQUESTS

app.listen(3000, (req, res)=>{
    console.log('server running on port 3000')
})
