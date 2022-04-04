import { FeedBack } from "../db/models/feedback";

export default class {
    static async index(req) {
        const feedbacks = await FeedBack.findAll({});
        return { data: feedbacks } 

    }

    static async create(req) {
        const feedbackObject = {
            ...req.body
        }
        const feedback = await FeedBack.create(feedbackObject)
        return { data: feedback } 

    }

    static async get(req) {
        const { id } = req.params;
        const feedback = await FeedBack.findOne({
            where: {
                id
            }
        });
        return { data: feedback } 

    }

    static async edit(req) {
        const { id } = req.params;
        const feedbackObject = {
            ...req.body
        }
        const feedback = await FeedBack.update(feedbackObject, {
            where: {
                id
            }
        })
        return { data: feedback } 

    }

    static async getByTicket(req) {
        const { ticketId } = req.query
        const feedbacks = await FeedBack.findAll({
            where: {
                ticketId
            }
        });
        return { data: feedbacks } 

    }

    static async getByAdmin(req) {
        const { adminId } = req.query
        const feedbacks = await FeedBack.findAll({
            where: {
                adminId
            }
        });
        return { data: feedbacks } 

    }
}