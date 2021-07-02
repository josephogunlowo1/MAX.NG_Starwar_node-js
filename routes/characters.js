const express = require('express');
const router = express.Router();
const characterService = require('../services/character');
const Film = require("../models/Film");
const axios = require('axios');
const _ = require('lodash');




router.get('/:movieId', async(req, res) => {
    const movieId = req.params.movieId;
     let characters = await characterService.fetchCharactersInMovie(req.params.movieId);
     if(characters.length !== 0){
       // var char = Character.collection.insert(characters);
       if ('sortBy' in req.query) {

        if (req.query.sortBy !== 'name' && req.query.sortBy !== 'gender' && req.query.sortBy !== 'height') {

            return res.status(400).json({
                'status': false,
                'message': 'sortBy Parameter must be name or gender or height'
            });

        }
        const sort = _.sortBy(characters, ['name','gender','height']);
      
        if ('order' in req.query){

            if (req.query.order !== 'asc' && req.query.order !== 'desc') {
                return res.status(400).json({
                    'status': false,
                    'message': 'order parameter must be asc or desc'
                });
            }
            if (req.query.order === 'asc' || req.query.order === 'desc'){
                orderBy = _.orderBy(sort, ['created'], [req.query.order]);
            }

        }

        if ('gender' in req.query){
        
            if (req.query.gender !== 'male' && req.query.gender !== 'female'){
               return  res.status(400).json({
                    'status': false,
                    'message': 'Gender parameter must be male or female'
                });
            }
            if (req.query.gender === 'male'){
                orderByGenderMale = _.filter(orderBy, ['gender', req.query.gender])
                return res.json({
                    status: 200,
                    message: 'Movie retrieved for number ' + movieId,
                    data: orderByGenderMale
                })
            }else{
                orderByGenderFemale =  _.filter(orderBy, ['gender', req.query.gender])
                return res.json({
                    status: 200,
                    message: 'Movie retrieved for number ' + movieId,
                    data: orderByGenderFemale
                })
            }
    }

}
    
     }else{
        return res.json({
            status: 500,
            message: 'No character retrieved for movie number ' + movieId 
        })
     }
     
});






module.exports = router;
