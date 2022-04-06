import { TeamMember, TeamSetting, Department, FeedBack, Ticket } from "../db/models";
import userSettings from "../constant/user-settings.json";
import Sequelize from "sequelize";

export default class {

    static async index() {

        const teamMembers = await TeamMember.findAll({});
        let collateTeamMember = [];

        teamMembers.forEach(async el => {
            const { id } = el;
            let assigned;
            let open;
            let closed;
            let reolved;
            let unreolved;

            assigned = await Ticket.count({
                where: id,
            })
            open = await Ticket.count({
                where: {
                    assignedTo: el.id,
                    status: 1
                },
            });
            closed = await Ticket.count({
                where: {
                    assignedTo: el.id,
                    status: 0
                },
            });
            reolved = await Ticket.count({
                where: {
                    assignedTo: el.id,
                    status: 2
                },
            });
            unreolved = await Ticket.count({
                where: {
                    assignedTo: el.id,
                    status: 3
                },
            });

            let teamMemberObject = {};
            teamMemberObject["assigned"] = assigned;
            teamMemberObject["open"] = open;

            collateTeamMember.push(teamMemberObject)
        });

        return { data: { collateTeamMember, teamMembers } }

    };

    static async create(req) {
        const createTeam = await TeamMember.create(req.body);
        const { adminId } = req.body;
        await TeamSetting.create({
            adminId: createTeam.id, fields: userSettings
        });
        if (!createTeam) {
            return { error: "An error occur when creating a new Team" };
        }
        return { data: createTeam };
    };

    static async get(req) {
        const { id } = req.params;
        const adminId = { adminId: req.params.id }
        const teamMember = await TeamMember.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Department,
                    attributes: ['id', 'name', 'status'],
                }, {
                    model: TeamSetting,
                    attributes: ['id', 'adminId', 'fields'],
                }, {
                    model: FeedBack,
                    attributes: ['id', 'usercomment', 'admincomment', 'rating'],
                }, {
                    model: Ticket,
                    attributes: ['id', 'status', 'userId', 'assignedTo', 'piority', 'department', 'comment', 'ticketNo'],
                }]
        });

        const feedBackTotalsum = await FeedBack.sum('rating', {
            where: adminId,
        });
        const totalFeedbackCount = await FeedBack.count({
            where: adminId
        });
        const averageRating = feedBackTotalsum / totalFeedbackCount;

        return { data: { averageRating: averageRating, teamMember } };
    };

    static async edit(req) {
        let { id } = req.params;
        const updateBody = {
            ...req.body,
        };
        const teamMember = await TeamMember.update(updateBody, {
            where: {
                id
            },
        });
        return { data: teamMember };
    };

    static async delete(req) {
        const { id } = req.params;
        const teamMember = await TeamMember.destroy({
            where: {
                id
            }
        });
        return { data: teamMember };
    };
};