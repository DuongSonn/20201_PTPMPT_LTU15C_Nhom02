var express = require('express');
const { route } = require('.');
var router = express.Router();
var userController = require('../controllers/UserController');
var conversationController = require('../controllers/ConversationController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/users', userController.index);

router.post('/conversations', conversationController.store);
router.get('/conversations', conversationController.index);

module.exports = router;
