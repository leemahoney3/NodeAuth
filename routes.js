'use strict';

const express = require('express');
const router  = express.Router();

const homeController    = require('./controllers/home');
const authController    = require('./controllers/auth');
const adminController   = require('./controllers/admin');
const accountController = require('./controllers/account');

router.get('/', homeController.index);

router.get('/auth/signin/', authController.signIn);
router.post('/auth/signin/', authController.postSignIn);

router.get('/auth/signup/', authController.signUp);
router.post('/auth/signup/', authController.postSignUp);

router.get('/auth/signout/', authController.signOut);

router.get('/account/edit/', accountController.editAccount);
router.post('/account/edit/', accountController.postEditAccount);

router.get('/admin/', adminController.index);
router.get('/admin/users/', adminController.listUsers);
router.get('/admin/users/edit/:userid/', adminController.editUser);
router.post('/admin/users/edit/:userid/', adminController.postEditUser);
router.get('/admin/users/delete/:userid/', adminController.deleteUser);

module.exports = router;
