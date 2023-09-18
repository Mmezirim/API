const express = require('express');
const route = express.Router();
const VideoLinks = require('../models/Videos');

route.post('/api/video_tutorials', (req, res) =>{
    const video = new VideoLinks(req.body);
    video.save()
    .then(() =>{
        res.status(200).json({message: 'Saved!'});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error saving video!'});
    })
});

route.get('/api/all_videos', (req, res) => {
    VideoLinks.find()
    .then((result) =>{
        res.status(200).json({video:result})
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
