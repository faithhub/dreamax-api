import {Ticket} from "../db/models"

export default class {

    static async createTicket(req, res, next){   
         //verifies the ticket body field is not empty
         if(!req.body){
             return res.status(400).json({message: "The Required fields are not filled"})
         }
         next()
    
    }

    static async editTicket(req,res,next){
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message: "ID of ticket can't be null!!"})
        }
        const checkTicket =  await Ticket.findOne({
            where: {
                id
            }
        })
        if(!checkTicket){
            return res.status(404).json({message: "Ticket doesn't Exist!!"})
        }
        next()
    }

    static async deleteTicket(req,res,next){
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message: "ID of ticket can't be null!!"})
        }
        const checkTicket =  await Ticket.findOne({
            where: {
                id,
                deleted: 0,
            }
        })
        if(!checkTicket){
            return res.status(404).json({message: "Ticket doesn't Exist!!"})
        }
        next()
    }
} 