'use strict';

const express = require('express');
const router  = express.Router();

const homeController    = require('./controllers/home');
const authController    = require('./controllers/auth');
const accountController = require('./controllers/account');

router.get('/', homeController.index);

router.get('/auth/signin/', authController.signIn);
router.post('/auth/signin/', authController.postSignIn);

router.get('/auth/signup/', authController.signUp);
router.post('/auth/signup/', authController.postSignUp);

router.get('/auth/signout/', authController.signOut);

router.get('/account/edit/', accountController.editAccount);
router.post('/account/edit/', accountController.postEditAccount);

module.exports = router;
