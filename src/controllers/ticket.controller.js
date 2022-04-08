import randomstring from "randomstring";
import { Ticket } from "../db/models";
import { TicketSchema } from "../validations/support.validations";

export default class {
  static async index(req) {
    const tickets = await Ticket.findAll({
      where: {
        deleted: 0,
      },
    });
    return { data: tickets };
  }
  static async create(req, res) {
    const randNo = randomstring.generate({
      length: 5,
      charset: "numeric",
    });
    // const { error, value } = TicketSchema.validate(req.body);
    // if (error) {
    //     return { error, value}
    // }
    const newTicketObject = {
      ...req.body,
      ticketNo: `#${randNo}`,
    };
    const tickets = await Ticket.create(newTicketObject);
    return { data: tickets };
  }
  static async edit(req) {
    const { id } = req.params;
    const updateBody = {
      ...req.body,
    };
    const tickets = await Ticket.update(updateBody, {
      where: {
        id,
        deleted: 0,
      },
    });
    return { data: tickets };
  }
  static async delete(req) {
    const { id } = req.params;
    const ticket = await Ticket.update(
      { deleted: 1 },
      {
        where: {
          id,
        },
      }
    );
    return { data: ticket };
  }
  static async get(req) {
    const { id } = req.params;
    const tickets = await Ticket.findOne({
      where: {
        id,
        deleted: 0,
      },
    });
    return { data: tickets };
  }
}
