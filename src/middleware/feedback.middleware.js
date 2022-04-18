import { FeedBack,Ticket,TeamMember } from "../db/models";
import { validateSchema } from "../validations/feedback.validation";

export default class{
    async createFeed(req,res,next){
        const { error } = validateSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ message: error.details[0].message });
        }

        if(!req.body){
            return res.status(404).json({message: "Feedback Required Field(s) is empty!!"})
        }
        next();
    }

    async getFeed(req,res,next){
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Feedback ID cannot be null"})
        }
        const checkIfFeedbackExist = await FeedBack.findOne({
            where: {
                id,
                deleted: 0,
            }
        })
        if(!checkIfFeedbackExist){
            return res.status(404).json({message: "Feedback doesn't Exist!!"})
        }
        next();
    }

    async editFeed(req,res,next){
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Feedback ID cannot be null"})
        }
        const checkIfFeedbackExist = await FeedBack.findOne({
            where: {
                id,
                deleted: 0,
            }
        })
        if(!checkIfFeedbackExist){
            return res.status(404).json({message: "Feedback doesn't Exist!!"})
        }
        next();
    }

    async getByTicketFeed(req,res,next){
        const { ticketId } = req.params;
        if(!ticketId){
            return res.status(400).json({message: "Ticket ID cannot be null"})
        }

        const checkIfTicketIsValid = await Ticket.findOne({
            where: {
                id: ticketId,
                deleted: 0,
            },
        });
        if(!checkIfTicketIsValid){
            return res.status(404).json({message: "Ticket doesn't Exist!!"})
        }
        next();
    }

    async getByAdminFeed(req,res,next){
        const { adminId } = req.query;
        if(!adminId){
            return res.status(400).json({message: "Admin ID cannot be null"})
        }
        const checkIfAdminExist = await TeamMember.findOne({
            where: {
                id: adminId
            }
        })
        if(!checkIfAdminExist){
            return res.status(404).json({message: "Admin doesn't Exist!!"})
        }
        next();
    }
}