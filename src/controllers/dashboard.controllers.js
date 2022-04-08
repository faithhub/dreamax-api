import { Ticket, TeamMember } from "../db/models";

export default class {
  static async index(req) {
    const { adminId } = req.params;
    const id = { assignedTo: req.params.adminId };

    const checkTeamMember = await TeamMember.findOne({
      where: {
        id: adminId,
        deleted: 0,
      },
    });

    if (!checkTeamMember) {
      return { error: "No team member fund for this id" };
    }

    const recentActivities = await Ticket.findAll({
      limit: 10,
      where: id,
      deleted: 0,
      order: [["createdAt", "DESC"]],
    });
    const assignedToTickets = await Ticket.count({
      where: id,
      deleted: 0,
    });
    const closedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "closed",
        deleted: 0,
      },
    });
    const openTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "open",
        deleted: 0,
      },
    });
    const reolvedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "resolved",
        deleted: 0,
      },
    });
    const unreolvedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "unresolved",
        deleted: 0,
      },
    });

    return {
      data: {
        assignedToTickets,
        openTickets,
        closedTickets,
        reolvedTickets,
        unreolvedTickets,
        recentActivities,
      },
    };
  }
}
