const Mongoose = require('mongoose');

const schema = Mongoose.Schema;

const filmSchema = new schema({
    _id: Mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Title Cannot Be Blank'],
    },
    opening_crawl: {
        type: String,
        required: [true, 'Opening Crawl Cannot Be Blank']
    },
    episode_id: {
        type: Number,
        required: [true, 'Episode ID Cannot Be Blank']
    },
    release_date: {
        type: String,
        required: [true, 'Release Date Cannot Be Blank']
    },
    comment_count: {
        type: Number, 
        default: 0
    }

});

module.exports = Mongoose.model('Film', filmSchema);