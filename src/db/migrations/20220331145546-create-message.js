'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      text: {
        type: Sequelize.TEXT(500)
      },
      image: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      adminId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      roomId: {
        type: Sequelize.INTEGER(11)
      },
      deleted: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};