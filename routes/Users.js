const express = require('express');
const bcrypt = require('bcrypt')
const route = express.Router();
const User = require('../models/UserModel');
const Blog = require('../models/blogModel');


route.put('/admin_dashboard/:id', async(req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json('You can only update your account')
    }
    
});

route.get('/admin_dashboard/:id',(req, res) => {
    
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        const {password, ...others} = result._doc;
        res.status(200).json(others);
    })
    .catch((err) => {
        res.status(500).json('error');
    });
})

route.get('/admin_dashboard/users', (req, res) =>{
    User.find().sort({createdAt: -1})
    .then((result) =>{
        res.status(200).json({
            users:result
        });
    }).catch((err) => {
        console.log(err);
    })
})

route.delete('/admin_dashboard/:id', async(req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                await Blog.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('User has been deleted');
            }catch(err){
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json('User not found');
        }
    }else{
        res.status(401).json('You can only delete your account')
    }
    
});


module.exports = route;
