import Sequelize from "sequelize";
const database = require('../../database/index');

const Department = database.define('departments', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    labelColour: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        default: 1,
        Comment: "The status includes, 0 for not active and 1 for active"
    },
    description: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
});

module.exports = Department;