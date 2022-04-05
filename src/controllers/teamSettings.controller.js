import { TeamSetting } from "../db/models";

export default class {

    static async get(req) {
        const { adminId } = req.params;
        const teamMember = await TeamSetting.findOne({
            where: {
                adminId
            }
        });
        return { data: { teamMember } };
    };

    static async edit(req) {
        const { adminId } = req.params;
       
        const getTeamMember = await TeamSetting.findOne({
            where: {
                adminId
            }
        });
        
        let newData = { ...getTeamMember.fields, ...req.body };

        const teamMember = await TeamSetting.update(
            { fields: newData }, {
            where: {
                adminId
            }
        });

        return { data: teamMember };
    }
}   