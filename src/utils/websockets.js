import chatService from "../services/chat.service";

class Websockets {
    connection(client) {
        client.on('msgToServer', async(payload) => {
           try {
            const getRoom = await chatService.checkRoomExist(payload.ticketId)
            const room = getRoom.data;

            client.join(room.id);
            const msg = await chatService.sendMessage(payload, room.id);

            const messages = await chatService.getAllRoomConversation(room.id);

            client.broadcast.to(room.id).emit('msgToClient', messages);
            client.emit('msgToClient', messages); 
           } catch (error) {
               console.log(error);
           }
        });

        // client.on('joinRoom', (payload) => {
        //     // fetch team setting and extract auto reply message
        //     const getRoom = await chatService.checkRoomExist(payload.ticketId)
        //     const room = getRoom.data;
        // });

        // client.on('updateConnection', (payload) => {
        //     // update 
        //     const findRoom = await chatService.getRoomForClient(payload.clientId);
        //     // dont know what to do

        // })

    }
}

export default new Websockets();