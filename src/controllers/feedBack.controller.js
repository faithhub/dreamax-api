import { FeedBack } from "../db/models";

export default class {
  static async index(req) {
    const feedbacks = await FeedBack.findAll({
      where: {
        deleted: 0,
      },
    });
    return { data: feedbacks };
  }

  static async create(req) {
    const feedbackObject = {
      ...req.body,
    };
    const feedback = await FeedBack.create(feedbackObject);
    return { data: feedback };
  }

  static async get(req) {
    const { id } = req.params;
    const feedback = await FeedBack.findOne({
      where: {
        id,
        deleted: 0,
      },
    });
    return { data: feedback };
  }

  static async edit(req) {
    const { id } = req.params;
    const feedbackObject = {
      ...req.body,
    };
    const feedback = await FeedBack.update(feedbackObject, {
      where: {
        id,
        deleted: 0,
      },
    });
    return { data: feedback };
  }

  static async getByTicket(req) {
    const { ticketId } = req.params;

    const feedbacks = await FeedBack.findOne({
      where: {
        ticketId,
        deleted: 0,
      },
      include: "Ticket",
    });
    return { data: feedbacks };
  }

  static async getByAdmin(req) {
    const { adminId } = req.query;
    const feedbacks = await FeedBack.findAll({
      where: {
        adminId,
        deleted: 0,
      },
    });
    return { data: feedbacks };
  }
}
