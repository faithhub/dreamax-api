'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  class RespondMessage extends Model {
=======
  class Ticket extends Model {
>>>>>>> 2c5443cd4e98f02e63342743920c2d1c9bf788d5
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
    }
  }
  RespondMessage.init({
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RespondMessage',
  });
  return RespondMessage;
=======
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
>>>>>>> 2c5443cd4e98f02e63342743920c2d1c9bf788d5
};