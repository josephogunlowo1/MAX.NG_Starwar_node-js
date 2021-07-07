const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const env = require('dotenv').config();
const axios = require('axios');
var stringify = require('json-stringify-safe');
const _ = require('lodash');
const Film = require("../models/Film");



 // Get all movies
router.get("/", async (request, response) => {
   // get all the movies from the api
   try {
   const api_url = `${process.env.SWAPI_URL}/films`
   const response_api = await axios.get(api_url);
   const repr = JSON.parse(stringify(response_api))
   //sort the movies by release date
   const sort = _.sortBy(repr.data['results'], 'release_date');
  
 //check if the movies already exist in the database
 //if yes, display them 
 //if no, save them to the database
     Film.find().select('title opening_crawl episode_id release_date comment_count').exec().then(obj => {
        if(obj.length > 0){
         const retrieved = {
            count: obj.length,
            filmArray: obj.filter(ob => {
                return {
                  title: ob.title,
                  opening_crawl: ob.opening_crawl,
                  episode_id: ob.episode_id,
                  release_date: ob.release_date,
                  comment_count: ob.comment_count
                }
            })
        }
         response.json({
            status: 200,
            message: "Film retrieved",
            data: retrieved
           
         })
        }else{  
         var film = Film.collection.insert(sort);
         
          response.json({
            status: 200,
            message: "Film retrieved",
            data: sort
         })
        }
     });
     
   }
   catch (err) {
      console.log(err)
      return response.json({ err })
   }
   
});






module.exports = router