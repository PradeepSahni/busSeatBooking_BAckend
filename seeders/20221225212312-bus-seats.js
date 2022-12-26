'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('busSeats', [
      { seatNo: 1,busID:1,status:0},
      { seatNo: 2,busID:1,status:0},
      { seatNo: 3,busID:1,status:0},
      { seatNo: 4,busID:1,status:0}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('busSeats', null, {});
     */
  }
};
