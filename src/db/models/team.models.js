import Sequelize from "sequelize";
const database = require('../../../configs/database.js');

const TeamMember = database.define('teamMembers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    message: {
        type: Array,
        allowNull: true
    }
});

module.exports = TeamMember;