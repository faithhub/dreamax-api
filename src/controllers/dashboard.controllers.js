import  { Ticket } from '../db/models';

export default class {

    static async index(req) {
        const { adminId } = req.params;
        const id = { assignedTo: req.params.adminId }
        const recentActivities = await Ticket.findAll({
            limit: 10,
            where: id,
            order: [['createdAt', 'DESC']]
        });
        const assignedToTickets = await Ticket.count({
            where: id,
        });
        const closedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 0
            },
        });
        const openTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status:1
            },
        });
        const reolvedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 2
            },
        });
        const unreolvedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: 3
            },
        });
        console.log(adminId)
        return { data: { assignedToTickets: assignedToTickets, openTickets: openTickets, closedTickets: closedTickets, reolvedTickets:reolvedTickets, unreolvedTickets:unreolvedTickets, recentActivities: recentActivities } }
    };
}
