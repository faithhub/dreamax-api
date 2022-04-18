import { Room, Message } from "../db/models";

export default class{
    async checkIfRoomExist(req,res,next){
        const {id} = req.body
        if(!id){
            return res.status(400).json({message: "Room ID can not be null"})
        }
        next()
    }

    async sendMessage(req,res,next){
        const {adminId, customerId } = req.body
        if(!adminId){
            return res.status(400).json({message: "Admin ID can not be null"})
        }
        if(!customerId){
            return res.status(400).json({message: "Customer ID can not be null"})
        }
    }
}