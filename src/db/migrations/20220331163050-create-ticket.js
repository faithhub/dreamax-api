"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      comment: {
        type: Sequelize.STRING(200),
      },
      ticketNo: {
        type: Sequelize.STRING(50),
      },
      department: {
        type: Sequelize.INTEGER(11),
      },
      piority: {
        type: Sequelize.ENUM,
        values: ["high", "medium", "low"],
      },
      status: {
        type: Sequelize.ENUM,
        values: ["opened", "closed", "resolved", "unresolved"],
        defaultValue: "opened",
      },
      resolvedTime: {
        type: Sequelize.INTEGER(11),
      },
      respondTime: {
        type: Sequelize.FLOAT,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      assignedTo: {
        type: Sequelize.INTEGER(11),
      },
      deleted: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
