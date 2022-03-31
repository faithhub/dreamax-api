import { Sequelize } from "sequelize";
import ChatRoom from "./chatRoom.models";
import Message from "./message.model";


const sequelize = new Sequelize('support', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Room = ChatRoom(sequelize);

const RoomMessage = Message(sequelize);

Room.hasMany(RoomMessage);

export {
    Room,
    RoomMessage
}

