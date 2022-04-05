'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Room, {as: 'Room', foreignKey: 'roomId'})
    }
  }
  Message.init({
    text: DataTypes.STRING,
    image: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};