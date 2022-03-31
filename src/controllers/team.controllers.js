const { check, validationResult } = require('express-validator');
const models = require("../db/models");
const TeamMember = models.TeamMember;

//Create a new Team Member
exports.createNewTeamMember = async function (req, res, next) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: "validation error",
                error: errors.mapped()
            })
        }
        const value = req.body;
        const createNewTeamMember = await TeamMember.create({
            username: value.username,
            firstName: value.firstName,
            lastName: value.lastName,
            departmentId: value.departmentId,
        })
        res.status(200).json({
            status: true,
            message: createNewTeamMember
        })
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Fetch all Team Members
exports.fetchAllTeamMembers = async function (req, res, next) {
    try {
        var allTeamMembers = await TeamMember.findAll();
        res.status(200).json({
            status: "success",
            message: allTeamMembers,
        });
    } catch (error) {
        res.status(403).json({
            status: false,
            message: error.message
        })
    }
};

//Fetch single Team Member
exports.fetchSingleTeamMember = async function (req, res, next) {
    try {
        var teamMemberId = req.params.id
        const fetchTeamMember = await TeamMember.findOne({
            where: {
                id: teamMemberId
            }
        })
        res.status(200).json({
            status: "success",
            message: fetchTeamMember,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Delete single Team member
exports.deleteSingleTeamMember = async function (req, res, next) {
    try {
        var teamMemberId = req.params.id
        const deleteTeamMember = await TeamMember.destroy({
            where: {
                id: teamMemberId
            }
        })
        res.status(200).json({
            status: true,
            message: deleteTeamMember,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Edit Team Member
exports.editTeamMember = async function (req, res, next) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: "validation error",
                error: errors.mapped()
            });
        }
        var teamMemberId = req.params.id
        var teamMembers = [];
        res.status(200).json({
            status: "success",
            message: teamMemberId,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};