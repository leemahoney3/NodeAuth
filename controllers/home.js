'use strict';

const auth = require('../models/auth');

const homeController = {

  index(request, response) {

    const user = auth.getUser(request.session.email);

    response.render('home', { user: user });

  }

};

module.exports = homeController;
