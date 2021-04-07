'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('user_roles', [
       {
        name: 'admin',
        created_by: 'system',
        updated_by:'system',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user',
        created_by: 'system',
        updated_by:'system',
        created_at: new Date(),
        updated_at: new Date()
      },
    
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('user_roles', null, {});
  }
};
