import { RespondMessage } from "../db/models";

export default class {
  static async index(req) {
    const getAutoResponse = await RespondMessage.findAll({
      where: {
        deleted: 0,
      },
    });

    return { data: getAutoResponse };
  }

  static async create(req) {
    const messageObject = {
      ...req.body,
    };
    const getAutoResponse = await RespondMessage.create(messageObject);

    return { data: getAutoResponse };
  }
}
