const express = require('express');
const {signUp,signIn } = require('../controllers/userController');
const {isAuthorized}=require('../auth/authorized')
const router = express.Router();

router.post('/signIn', signIn);

router.post('/signUp', signUp);

module.exports = {
    routes: router
} 