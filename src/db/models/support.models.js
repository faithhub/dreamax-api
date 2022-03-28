// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import Sequelize from "sequelize";
const database = require('../../../configs/database.js');

const Chats = database.define('chatSupport', {
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

export default Chats;