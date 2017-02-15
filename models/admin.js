'use strict';

const bcrypt  = require('bcrypt');

const Database = require('./database');

const admin = {

  database: new Database('./data/database.json', { users: [] }),
  collection: 'users', // Collection is basically same as table name in MySQL Database.

  getAllUsers() {

    return this.database.findAll(this.collection);

  },

  getUser(id) {

    const result = this.database.findOneBy(this.collection, { 'id': id });
    return result[0];

  },

  getUserByEmail(email) {

    const result = this.database.findOneBy(this.collection, { 'email': email });
    return result[0];

  },

  checkEmailExists(email) {

    const result = this.database.findOneBy(this.collection, { 'email': email });
    return result.length;

  },

  checkPassword(email, password) {

    const hashedPassword = this.getUserByEmail(email).password;
    return bcrypt.compareSync(password, hashedPassword);

  },

  updateUser(id, data) {

    //const user = this.getUser(email);

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    this.database.update(this.collection, { 'id': id }, data);

  },

  deleteUser(id) {

    this.database.remove(this.collection, { 'id': id });

  }

};

module.exports = admin;
