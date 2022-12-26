'use strict';

/* @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('buses', [{
       name: 'Army Express'
     }], {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('buses', null, {});
  }
};
