const { check, validationResult } = require('express-validator');
const { TeamSetting } = require("../db/models");
const userSettings = require("../constant/user-settings.json");

export default class {

    static async get(req) {
        const { adminId } = req.params;
        console.log(adminId)
        const teamMember = await TeamSetting.findOne({
            where: {
                adminId
            }
        });
        return { data: { teamMember } };
    };

    static async edit(req) {
        var { adminId } = req.params;
       
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