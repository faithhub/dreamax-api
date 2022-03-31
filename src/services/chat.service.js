import { Room } from '../db/models'
import { RoomMessage } from '../db/models'

const checkRoomExist = async(ticketId) => {
    const findRoom  = await Room.findOne({
        where: {
            ticketId
        }
    })

    if(findRoom) {
        return findRoom;
    }

    const createRoom = Room.build({
        ticketId: ticketId
    });
    await createRoom.save();

    return createRoom;

}

const sendMessage = async (content, roomId) => {
    const newMessage = RoomMessage.build({
        text: content.text,
        image: content.image,
        roomId: roomId,
        
    })

}

export { checkRoomExist, sendMessage}