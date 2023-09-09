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


route.delete('/api/newsletter/:id/:property', async (req, res) => {
    try {
      const { id, property } = req.params;
      const mail = await Mail.findById(id);
      if (!mail) {
        return res.status(404).json({ message: 'Property not found' });
      }
      mail[property] = undefined;
      await mail.save();
  
      return res.json({ message: `${property} removed from user` });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = route;