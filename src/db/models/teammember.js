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
      this.belongsTo(models.Department, {foreignKey:"departmentId"})
    }
  }
  TeamMember.init({
    adminId: DataTypes.INTEGER,
    adminType: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
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