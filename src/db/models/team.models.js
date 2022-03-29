import Sequelize from "sequelize";
const database = require('../../database/index');

const TeamMember = database.define('teamMembers', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    adminType: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        default: 1,
        Comment: "The Admin is 2, while the Customer Care is 2"
    },
    departmentId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        Comment: "The status includes, 0 for not available/away and 1 for available"
    }
});

module.exports = TeamMember;