const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const topicSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);