'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TeamMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminType: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 1
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: true
      },
      departmentId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING(50),
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['avaialable', 'away'],
        allowNull: false,
        defaultValue: 'away'
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
    await queryInterface.dropTable('TeamMembers');
  }
};