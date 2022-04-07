'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TeamMember, { foreignKey: 'adminId' })
    }
  }
  TeamSetting.init({
    fields: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("fields"));
      },
      set: function (value) {
        return this.setDataValue("fields", JSON.stringify(value));
      }
    },
    adminId: {
      type: DataTypes.INTEGER
    },
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamSetting',
  });
  return TeamSetting;
};