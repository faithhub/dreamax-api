import { Sequelize } from "sequelize";
const database = new Sequelize('chat-support', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default database;