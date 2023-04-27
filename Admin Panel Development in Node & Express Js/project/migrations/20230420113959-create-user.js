'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:true
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull:true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      status: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '1',
        allowNull:true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};