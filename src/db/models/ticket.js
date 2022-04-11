"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Room, { as: "ChatRoom", foreignKey: "ticketId" });
      this.hasOne(models.FeedBack, { as: "FeedBack", foreignKey: "ticketId" });
    }
  }
  Ticket.init(
    {
      comment: DataTypes.STRING,
      department: DataTypes.INTEGER,
      piority: {
        type: DataTypes.ENUM,
        values: ["high", "medium", "low"],
      },
      status: {
        type: DataTypes.ENUM,
        values: ["open", "closed", "resolved", "unresolved"],
      },
      storeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      assignedTo: DataTypes.INTEGER,
      ticketNo: DataTypes.STRING,
      resolvedTime: DataTypes.FLOAT,
      respondTime: DataTypes.INTEGER,
      deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
