'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Room, {as: 'ChatRoom', foreignKey: 'ticketId'})
    }
  }
  Ticket.init({
    comment: DataTypes.STRING,
    department: DataTypes.INTEGER,
    piority: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    assignedTo: DataTypes.INTEGER,
    ticketNo: DataTypes.STRING,
    resolvedTime: DataTypes.DATE,
    respondTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};