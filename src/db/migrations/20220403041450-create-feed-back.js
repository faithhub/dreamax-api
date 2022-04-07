'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FeedBacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      usercomment: {
        type: Sequelize.TEXT(500)
      },
      admincomment: {
        type: Sequelize.TEXT(500)
      },
      ticketId: {
        type: Sequelize.INTEGER(11)
      },
      adminId: {
        type: Sequelize.INTEGER(11)
      },
      rating: {
        type: Sequelize.INTEGER(11),
        default: 0
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
    await queryInterface.dropTable('FeedBacks');
  }
};