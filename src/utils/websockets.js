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
               console.log(error)
           }
        });
        client.on('joinRoom', () => {
            // fetch team setting and extract auto reply message

            


        })

        client.on('updateConnection', () => {
            // update 
            

        })
    }
}

export default new Websockets();