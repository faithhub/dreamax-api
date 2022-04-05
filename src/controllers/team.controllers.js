const { check, validationResult } = require('express-validator');
const { TeamMember } = require("../db/models");
const { TeamSetting } = require("../db/models");
const userSettings = require("../constant/user-settings.json");

export default class {

    static async index() {
        const teamMembers = await TeamMember.findAll({});
        return { data: teamMembers }
    };

    static async create(req) {
        const createTeam = await TeamMember.create(req.body);
        const { adminId } = req.body;
        await TeamSetting.create({
            adminId, fields: userSettings
        });
        if (!createTeam) {
            return { error: "An error occur when creating a new Team" };
        }
        return { data: createTeam };
    };

    static async get(req) {
        const { id } = req.params;
        const teamMember = await TeamMember.findOne({
            where: {
                id
            },
        });
        return { data: teamMember };
    };

    static async edit(req) {
        var { id } = req.params;
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