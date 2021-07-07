const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const env = require('dotenv').config();
const axios = require('axios');
var stringify = require('json-stringify-safe');
const _ = require('lodash');
const Film = require("../models/Film");
const Comment = require("../models/Comment");


// Save comment to database
router.post("/add", (req, res) => {
   try {     
    Film.find().select('title opening_crawl episode_id release_date comment_count').exec().then(obj => {
    if(obj.length > 0){ 
        let check = false;
        for (let i = 0; i < obj.length; i++){
            if (obj[i].episode_id === req.body.commentable_id) {
                check = true;
                break;
            }
        }

        if (check !== true){
            return  res.status(400).json({
                 status: false,
                 message: 'Movie ID is invalid',
                 data: null
             });
 
         }
         let comm = new Comment({
            _id:  Mongoose.Types.ObjectId(),
            comment: req.body.comment, 
            commentable_id: req.body.commentable_id,
            commentable_type: req.body.commentable_type,
            ip_address: req.header('x-forwarded-for') || req.connection.remoteAddress,
            date: new Date(Date.now()).toISOString()
         });

        
            // add new comment to the database
          Comment.collection.insert(comm);
          // Get the movie with the episode id we have submitted on the form and then update the comment 
          let Allow = Film.findOne({episode_id: comm.commentable_id}).exec();
          Allow.then(doc =>{
            Film.collection.update({"episode_id" : comm.commentable_id },{$set : {"comment_count": doc.comment_count + 1 }})
          }).catch(err => {
            return res.json({ err })
          })
         
         return  res.json({
            status: true,
            message: 'comment created successfully',
            data: null
        });
     
        
        
        
        
    }else{
        return  res.json({
            status: false,
            message: 'movie not found',
            data: null
        });
    }
 })
}
   catch (err) {
      console.log(err)
      return res.json({ err })
   }
   
});

// Get comment for a movie
router.get('/:movieId', (req, res) => {
   const movieId = req.params.movieId;
   Film.findOne({episode_id: movieId}).exec().then(dd => {
        if(!dd){
            return  res.status(400).json({
                status: false,
                message: 'Movie ID  does not exist',
                data: null
            });
        }else{
            Comment.find({commentable_id: dd.episode_id}).exec().then(doccumen =>{ 
                if(doccumen.length !== 0){
                    return  res.status(200).json({
                        status: true,
                        message: 'Comment retrieved for Movie number ' + movieId,
                        ip_address: doccumen.ip_address,
                        data: _.sortBy(doccumen, 'release_date'),
                    });
                }else{
                    return  res.status(400).json({
                        status: false,
                        message: 'No comment found for this movie at this time',
                        data: null
                    }); 
                }
            })
        }
       
});
    
   
    



});

module.exports = router