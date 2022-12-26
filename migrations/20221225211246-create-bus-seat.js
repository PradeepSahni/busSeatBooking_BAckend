'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('busSeats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seatNo: {
        type: Sequelize.INTEGER
      },
      busID: {
        type: Sequelize.INTEGER
      },
      status: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      reserveBy: {
        type: Sequelize.INTEGER
      },
      reserveAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
        comment : "createdAt"
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment :"updatedAt"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('busSeats');
  }
};