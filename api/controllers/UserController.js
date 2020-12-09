var User = require('../models/user');

exports.login = async function(req, res) {
    try {
        const {name ,password} = req.body;
        let checkUser = await User.findOne({
            name: name,
            password: password
        });
        if (checkUser) {
            return res.status(200).send({
                user: checkUser
            });
        }
    
        return res.sendStatus(404);   
    } catch (error) {
        console.log(error)

        return res.sendStatus(500);
    }
}

exports.register = async function(req, res) {
    try {
        const {name ,password} = req.body;
        const user = new User({
            name: name,
            password: password
        });
        await user.save();
        if (user) {
            return res.status(200).send({
                user: user
            });
        }
    
        return res.sendStatus(404);   
    } catch (error) {
        console.log(error)

        return res.sendStatus(500);
    }
}

exports.index = async function(req, res)  {
    try {
        const users = await User.find();

        return res.status(200).send({
            users: users
        });     
    } catch (error) {
        console.log(error)

        return res.sendStatus(500);
    }
}