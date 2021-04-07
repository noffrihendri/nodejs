'use strict';

const md5 = require('md5')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


       return queryInterface.bulkInsert('users', [{
        name: 'admin',
        email: 'admin@gmail.com',
        password: md5('admin'),
        role_id : 1,
        created_by: 'system',
        updated_by:'system',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('users', null, {});
  }
};
