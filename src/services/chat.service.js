const { Room, Message } = require('../models');
const { NotFoundException, BadRequestException } = require('../exceptions')

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

    return { data: createRoom };

}

const sendMessage = async (content, roomId) => {
    const newMessage = Message.build({
        text: content.text,
        image: content.image,
        roomId: roomId,
        
    });
    await newMessage.save();

    return { data: newMessage };
}

const getAllRoomConversation = async(roomId) => {
    const getMessages = await Message.findAll({
        where: {
            roomId: roomId
        }
    });

    if (!getMessages) {
        throw new NotFoundException('No messages was found with this roomId')
    }

    return { data: getMessages };
}

module.exports =  { checkRoomExist, sendMessage, getAllRoomConversation }