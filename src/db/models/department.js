'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.TeamMember, {foreignKey:"departmentId"})
    }
  }
  Department.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.INTEGER,
    labelColor: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};