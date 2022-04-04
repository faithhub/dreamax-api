const { TeamMember } = require('../db/models');
// const { NotFoundException, BadRequestException } = require('../exceptions');

export default class{
    static async createNewTeamMember(payload){
        const createTeamMember = await TeamMember.create({
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            departmentId: payload.departmentId,
        });
    
        if (!createTeamMember) {
            return {error: "An error occur when creating a new team member"};
        }
    
        return { data: createTeamMember };
    };

    static async updateSingleTeamMember(teamMemberId, payload) {
        const updateTeamMember = await TeamMember.update(
            { username: payload.username },
            {
                where: { id: teamMemberId }
            });
        if (!updateTeamMember) {
            return {error: "An error occur when creating a new department"};
        }
        return { data: updateTeamMember };
    };

    static async getAllTeamMembers(){
        const getAll = await TeamMember.findAll({});
        return { data: getAll };
    };

    static async getSingleTeamMember(teamMemberId){
        const getSingle = await TeamMember.findOne({
            where: {
                id: teamMemberId
            }
        });
    
        if (!getSingle) {
            return {error: "No team member found with this teamMemberId " + teamMemberId};
        }
    
        return { data: getSingle };
    };

    static async deleteSingleTeamMember(teamMemberId){
        const deleteTeamMember = await TeamMember.destroy({
            where: {
                id: teamMemberId
            }
        });
    
        if (!deleteTeamMember) {
            return {error: "No team member found with this teamMemberId " + teamMemberId};
        }
    
        return { data: deleteTeamMember };
    };
};