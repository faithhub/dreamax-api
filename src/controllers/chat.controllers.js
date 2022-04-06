import { Room, Message } from '../db/models';
import { Op } from "sequelize";

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

    static async sendMessage(req, res) {
        const {text, image, adminId, customerId } = req.body;
        const newMessage = Message.build({
            text: text ? text : "",
            image: image ? image : "",
            customerId: customerId,
            adminId:   adminId          
        });
        await newMessage.save();
    
        return { data: newMessage };
    }
    
    static async getAllConversation (req, res) {
        const { id } = req.param;
        const getMessages = await Message.findAll({
            where: {
                [Op.or]: [
                  { customerId: id },
                  { adminId: id }
                ]
              }
        });
    
        return { data: getMessages };
    }

}




