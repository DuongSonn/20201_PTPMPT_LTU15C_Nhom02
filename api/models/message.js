var mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Message', messageSchema);