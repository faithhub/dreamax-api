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
        default: 1,
        Comment: "The Admin is 2, while the Customer Care is 2"
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
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        Comment: "The status includes, 0 for not available/away and 1 for available"
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