'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Department, {foreignKey: 'departmentId'})
      this.hasOne(models.TeamSetting, {foreignKey:"adminId"})
      this.hasMany(models.FeedBack, {foreignKey:"adminId"})
      this.hasMany(models.Ticket, {foreignKey:"assignedTo"})
    }
  }
  TeamMember.init({
    adminId: DataTypes.INTEGER,
    adminType: DataTypes.INTEGER,
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "Department",
        key: 'id',
      },
    },
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};