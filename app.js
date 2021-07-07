const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./api-docs');
require("dotenv").config({ path: "./env" });
require('./src/helpers/init_mongodb')
swaggerDocument = require('./')



const filmRoutes  = require('./src/routes/films');
const commentRoutes = require('./src/routes/comments');
const characterRoutes = require('./src/routes/characters');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.all("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With,XMLHttpRequest");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS, PATCH");
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// Routes which should handle requests
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/films', filmRoutes);
app.use('/comments', commentRoutes);
app.use('/characters', characterRoutes);

//listening on port 3000
app.listen(3000, () => {
     console.log("listening at 3000...")
 });


module.exports = app;