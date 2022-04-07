import { Room, Message, Ticket, TeamSetting } from '../db/models';
// const { Op } = require('sequelize/types');

export default class {
    static async checkRoomExist(ticketId) {
        const findRoom  = await Room.findOne({
            where: {
                ticketId: ticketId
            }
        })
    
        if(findRoom) {
            return { data: findRoom };
        }
    
        const createRoom = Room.build({
            ticketId: ticketId
        });
        await createRoom.save();
    
        return { data: createRoom };
    
    }

    static async sendMessage(content, roomId) {
        const newMessage = Message.build({
            text: content.text,
            image: content.image,
            roomId: roomId,
            
        });
        await newMessage.save();
    
        return { data: newMessage };
    }
    
    static async getAllRoomConversation (roomId) {
        const getMessages = await Message.findAll({
            where: {
                roomId: roomId
            }
        });
    
        return { data: getMessages };
    }

    
    static async getRoomForClient(id) {
        const getTicket = await Ticket.findOne({
            where: {
                customerId: id,
                assignedTo: id
            },
            include: 'ChatRoom'
        });

        return { data: getTicket };

    }

    static async getTeamAutoReply(id) {
        const getSetting = await TeamSetting.findOne({
            where: {
                adminId: id,
            },
        });

        let settingsData = { ...getSetting.fields };

        let replymessage = settingsData.autoReplyMessage

        return { data: replymessage };

    }

}





// const fetchUserConversation = async(userId) => {

//    const useConversation = await Message.findAll({
//        where: {
//            [Op.or]: [
//                {customerId: userId},
//                {adminId: userId}
//            ]
//        }
//    });

//    if (!useConversation) {
//        throw new NotFoundException('No conversation was found')
//    }

//    return { data: useConversation }
// }
