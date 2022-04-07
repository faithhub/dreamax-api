'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RespondMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      message: {
        type: Sequelize.TEXT(500)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RespondMessages');
  }
};