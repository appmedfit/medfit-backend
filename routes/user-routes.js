const express = require('express');
const {signUp,signIn,generateToken,signOut } = require('../controllers/userController');
const {isAuthorized}=require('../auth/authorized')
const router = express.Router();

router.post('/signIn', signIn);

router.post('/signUp', signUp);

router.post('/signOut', signOut);
module.exports = {
    routes: router
} 