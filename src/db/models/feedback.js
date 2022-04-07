'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ticket, {as: 'Ticket', foreignKey: 'ticketId'})
    }
  }
  FeedBack.init({
    usercomment: DataTypes.TEXT,
    admincomment: DataTypes.TEXT,
    ticketId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FeedBack',
  });
  return FeedBack;
};