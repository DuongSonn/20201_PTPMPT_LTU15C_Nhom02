var mongoose = require('mongoose');

const { Schema } = mongoose;

const conversationSchema = new Schema({
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }]
});

module.exports = mongoose.model('Conversation', conversationSchema);