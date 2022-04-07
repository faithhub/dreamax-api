import  { Ticket } from '../db/models';

export default class {

    static async index(req) {
        const { adminId } = req.params;
        const id = { assignedTo: req.params.adminId }
        const recentActivities = await Ticket.findAll({
            limit: 10,
            where: id, deleted: 0,
            order: [['createdAt', 'DESC']]
        });
        const assignedToTickets = await Ticket.count({
            where: id,
            deleted: 0
        });
        const closedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 'closed',
                deleted: 0
            },
        });
        const openTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 'open',
                deleted: 0
            },
        });
        const reolvedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 'resolved',
                deleted: 0
            },
        });
        const unreolvedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 'unresolved',
                deleted: 0
            },
        });
        console.log(adminId)
        return { data: { assignedToTickets: assignedToTickets, openTickets: openTickets, closedTickets: closedTickets, reolvedTickets:reolvedTickets, unreolvedTickets:unreolvedTickets, recentActivities: [] } }
    };
}
