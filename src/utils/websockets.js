import { checkRoomExist, getAllRoomConversation, sendMessage } from "../services/chat.service"

class Websockets {
    connection(client) {
        client.on('msgToServer', async(payload) => {
            const room = await checkRoomExist(payload.ticketId);
            client.join(room.id);
            const msg = await sendMessage(payload, room.id);

            const messages = await getAllRoomConversation(room.id);

            client.broadcast.to(room.id).emit('msgToClient', messages);
            client.emit('msgToClient', messages);
        })
    }
}

export default new Websockets();