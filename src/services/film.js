const axios = require('axios');
  stringify = require('json-stringify-safe');
  require('dotenv').config();
  require('lodash');

/**
 * fetches all movies
 *
 * @returns {Promise<Promise<*|Promise<never>|undefined>|T>}
 */
   exports.fetchMovies = async function () {

        try {
         const api_url = `${process.env.SWAPI_URL}/films`
         const response_api = await axios.get(api_url);
         const repr = JSON.parse(stringify(response_api))
         const sortMovieByReleaseDate = _.sortBy(repr.data['results'], 'release_date');
         return sortMovieByReleaseDate;

        } catch (e) {
           return  Promise.reject(e);
        }

    };

    exports.fetchMovieById = async (movieId) => {

      try {
           const response = await axios.get(`${process.env.SWAPI_URL}/films/${movieId}`);
           return response.data;

      }catch (e) {
          return Promise.reject(e);
      }
  };
