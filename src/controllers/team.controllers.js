import { TeamMember, TeamSetting, Department, FeedBack} from "../db/models";
import userSettings from "../constant/user-settings.json";

export default class {

    static async index() {
        const teamMembers = await TeamMember.findAll({});
        return { data: teamMembers }
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
                },]
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