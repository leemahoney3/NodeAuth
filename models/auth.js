'use strict';

const passwordHash  = require('password-hash');

const Database = require('./database');

const auth = {

  database: new Database('./data/database.json', { users: [] }),
  collection: 'users', // Collection is basically same as table name in MySQL Database.

  getUser(id) {

    const result = this.database.findOneBy(this.collection, { 'id': id });
    return result[0];

  },

  getUserByEmail(email) {

    const result = this.database.findOneBy(this.collection, { 'email': email });
    return result[0];

  },

  signUp(data) {

    data.password = passwordHash.generate(data.password);
    this.database.add(this.collection, data);

  },

  checkEmailExists(email) {

    const result = this.database.findOneBy(this.collection, { 'email': email });
    return result.length;

  },

  checkPassword(email, password) {

    const hashedPassword = this.getUserByEmail(email).password;
    return passwordHash.verify(password, hashedPassword);

  },

  updateUser(id, data) {

    //const user = this.getUser(email);

    this.database.update(this.collection, { 'id': id }, data);

  }

};

module.exports = auth;
