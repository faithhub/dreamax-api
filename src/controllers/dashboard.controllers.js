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
        const openTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: "open"
            },
        });
        const closedTickets = await Ticket.count({
            where: {
                assignedTo: adminId,
                status: "closed"
            },
        });
        console.log(adminId)
        return { data: { assignedToTickets: assignedToTickets, openTickets: openTickets, closedTickets: closedTickets, recentActivities: recentActivities } }
    };
}
