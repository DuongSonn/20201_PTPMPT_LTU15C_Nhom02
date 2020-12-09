var Conversation = require('../models/conversation');

exports.store = async function(req, res) {
    try {
        let {recipients, id} = req.body;
        recipients.push(id);

        const conversation = new Conversation({
            recipients: recipients,
            messages: [],
        });
        await conversation.save();

        return res.status(200).send({
            conversation: conversation
        })
    } catch (error) {
        console.log(error);

        return res.sendStatus(500);
    }
}

exports.index = async function(req, res) {
    try {
        const id = req.header('id');
        const conversations = await Conversation.find({
            recipients: id
        }).populate('messages', 'sender text');

        return res.status(200).send({
            conversations: conversations
        })
    } catch (error) {
        console.log(error);

        return res.sendStatus(500);
    }
}
