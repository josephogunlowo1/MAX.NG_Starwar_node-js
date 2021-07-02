const filmService = require('../services/film'),
    axios = require('axios');

/**
 * Fetch characters in a movie
 * @param movieId
 * @returns {Promise<any[]>}
 */
exports.fetchCharactersInMovie = async function (movieId) {

    try {

        const movieData = await filmService.fetchMovieById(movieId);
        // Promise.all is a promise that takes an array of promises as an input (an iterable). 
        // Then it gets resolved when all the promises get resolved or any one of them gets rejected
        // here we pass the array of movie characters as an input to Promise.all()
        let movieCharacters = await Promise.all( movieData.characters.map(async (url) => {
            const characterData = await axios.get(url);
            return characterData.data;
        }));

        return movieCharacters;

    }catch (e) {
        Promise.reject(e);
    }
};