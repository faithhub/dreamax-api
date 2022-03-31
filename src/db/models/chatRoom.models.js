// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import Sequelize from "sequelize";

const ChatRoom = sequelize => sequelize.define('chatRoom', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
    },
    ticketId: {
        type: Sequelize.UUIDV4,
        allowNull: false
    },

});

export default ChatRoom;