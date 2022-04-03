const { TeamMember } = require('../db/models');
const { NotFoundException, BadRequestException } = require('../exceptions');

const createNewTeamMember = async (payload) => {
    const createTeamMember = await TeamMember.create({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        departmentId: payload.departmentId,
    })

    if (!createTeamMember) {
        throw new BadRequestException("An error occur when creating a new team member")
    }

    return { data: createTeamMember };

}

const updateSingleTeamMember = async function (teamMemberId, payload) {
    const updateTeamMember = await TeamMember.update(
        { username: payload.username },
        {
            where: { id: teamMemberId }
        });
    if (!updateTeamMember) {
        throw new BadRequestException("An error occur when updating team member details");
    }
    return { data: updateTeamMember };
}

const getAllTeamMembers = async () => {
    const getAll = await TeamMember.findAll({})
    return { data: getAll }
}

const getSingleTeamMember = async (teamMemberId) => {
    const getSingle = await TeamMember.findOne({
        where: {
            id: teamMemberId
        }
    });

    if (!getSingle) {
        throw new NotFoundException('No team member found with this teamMemberId ' + teamMemberId)
    }

    return { data: getSingle };
}

const deleteSingleTeamMember = async (teamMemberId) => {
    const deleteTeamMember = await TeamMember.destroy({
        where: {
            id: teamMemberId
        }
    });

    if (!deleteTeamMember) {
        throw new NotFoundException("No team member found with this teamMemberId " + teamMemberId)
    }

    return { data: deleteTeamMember };
}

module.exports = { getAllTeamMembers, getSingleTeamMember, deleteSingleTeamMember, createNewTeamMember, updateSingleTeamMember }