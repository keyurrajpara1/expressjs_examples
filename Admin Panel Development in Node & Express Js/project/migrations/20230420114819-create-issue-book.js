'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IssueBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      bookId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName: "Books"
          },
          key: "id"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName: "Users"
          },
          key: "id"
        }
      },
      days_issued: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      issued_date: {
        type: Sequelize.DATE,
        allowNull:true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      is_returned: {
        type: Sequelize.ENUM('1', '0'),
        allowNull:true,
        defaultValue: '0'
      },
      returned_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      status: {
        type: Sequelize.ENUM('1', '0'),
        allowNull:true,
        defaultValue: '1'
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
    await queryInterface.dropTable('IssueBooks');
  }
};