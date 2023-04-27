'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
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
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName: "Categories"
          },
          key: "id"
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      cover_image: {
        type: Sequelize.STRING,
        allowNull:true
      },
      author: {
        type: Sequelize.STRING,
        allowNull:true
      },
      status: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '1',
        allowNull:true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};