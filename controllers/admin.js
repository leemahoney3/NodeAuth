'use strict';

const auth    = require('../models/auth');
const admin   = require('../models/admin');

let success = false;
let error   = '';

const adminController = {

  index(request, response) {

    const user = auth.getUser(request.session.id);

    if (user.isAdmin) {
      response.render('admin/home', { title: 'Admin Area', user: user });
    } else {
      response.redirect('/');
    }

  },

  listUsers(request, response) {

    const user      = auth.getUser(request.session.id);

    const userList  = admin.getAllUsers();

    if (user.isAdmin) {
      response.render('admin/users/list', { title: 'Users - Admin Area', user: user, userList: userList });
    } else {
      response.redirect('/');
    }

  },

  editUser(request, response) {

    const user = auth.getUser(request.session.id);

    const mockUser = auth.getUser(request.params.userid);

    if (!mockUser) {
      response.redirect('/admin/users/');
    } else if (!user.isAdmin) {

      response.redirect('/');

    } else {

      response.render('admin/users/edit', { title: 'Edit User - Admin Area', user: user , mockUser: mockUser });

    }

  },

  postEditUser(request, response) {

    const user     = auth.getUser(request.session.id);
    let   mockUser = auth.getUser(request.params.userid);

      const data = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email
      };

      if (request.body.password != '') {
        data.password = request.body.password;
      }

      if(request.body.isAdmin) {
        data.isAdmin = true;
      } else {
        data.isAdmin = false;
      }

      // Validation

      if (data.firstName == '' || data.lastName == '' || data.email == '') {
        error = 'Please fill in all fields.';
        success = false;
      } else if (auth.checkEmailExists(data.email) && data.email != mockUser.email) {
        error = 'That email is in use by another user.';
        success = false;
      } else {

        admin.updateUser(mockUser.id, data);
        error   = '';
        success = true;

      }

      // Slight bug, page doesnt update on re-render, so lets update the object with latest data.
      mockUser = {
        id: mockUser.id,
        isAdmin: data.isAdmin,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      };

      response.render('admin/users/edit', { title: 'Edit User - Admin Area', success: success, error: error, user: user , mockUser: mockUser });


  },

  deleteUser(request, response) {

    const user     = auth.getUser(request.session.id); // logged in user
    const mockUser = auth.getUser(request.params.userid); // user being deleted (temporary 'mock' user)

    if (!user.isAdmin) {
      response.redirect('/');
    } else if (!mockUser) {
      response.redirect('/admin/users/');
    } else {
      admin.deleteUser(mockUser.id);
      response.redirect('/admin/users/');
    }

  }



};

module.exports = adminController;
