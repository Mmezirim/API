const express = require('express');
const route = express.Router();
const Mail = require('../models/newsletters');

route.post('/api/newsletter', (req, res) =>{
    const mail = new Mail(req.body);
    mail.save()
    .then(() =>{
        res.status(200).json({message: 'Data saved sucessfully'});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error saving data'});
    })
});

route.get('/api/all_newsletters', (req, res) => {
    Mail.find()
    .then((result) =>{
        res.status(200).json({mail:result})
    })
    .catch((err)=>{
        res.status(500).json({message:'Error'})
    })
})


route.delete('/api/newsletter/:id', (req, res) => {
    const id = req.params.id;
   Mail.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/api/all_newsletters'});
    })
    .catch((err) => {
        console.log(err);
    })
});
  

module.exports = route;
