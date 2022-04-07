import { TeamSetting, TeamMember } from "../db/models";

export default class {

    static async get(req) {
        const { adminId } = req.params;
        const teamMember = await TeamSetting.findOne({
            where: {
                adminId,
                deleted: 0
            }, include: [ {
                    model: TeamMember,
                    attributes: ['id', 'username', 'firstName', 'lastName'],
                },]
        });
        return { data: { teamMember } };
    };

    static async edit(req) {
        const { adminId } = req.params;
       
        const getTeamMember = await TeamSetting.findOne({
            where: {
                adminId,
                deleted: 0
            }
        });

        let newData = { ...getTeamMember.fields, ...req.body };

        const teamMember = await TeamSetting.update(
            { fields: newData }, {
            where: {
                adminId,
                deleted: 0
            }
        });

        return { data: teamMember };
    }
}   