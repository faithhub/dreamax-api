import Sequelize from "sequelize";

const Message = sequelize => sequelize.define('message', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customerId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    adminId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    roomId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },

});

export default Message;