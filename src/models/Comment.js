const Mongoose = require('mongoose');

const schema = Mongoose.Schema;

const commentSchema = new schema({
    _id: Mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        required: [true, 'Body Cannot Be Blank'],
    },
    commentable_id: {
        type: Number,
        required: [true, 'Commentable ID Cannot Be Blank']
    },
    commentable_type: {
        type: String,
        required: [true, 'Commentable Type Cannot Be Blank']
    },
    ip_address: {
        type: String,
        required: [true, 'IP Address Cannot Be Blank']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('Comment', commentSchema);