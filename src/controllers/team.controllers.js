const { check, validationResult } = require('express-validator');
const { getAllTeamMembers, getSingleTeamMember, deleteSingleTeamMember, createNewTeamMember, updateSingleTeamMember } = require("../services/team.service");

class Team {
    constructor() {

        //Create a new Team Member
        this.createNewTeamMember = async function (req, res, nex) {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        status: "validation error",
                        error: errors.mapped()
                    })
                }
                const data = req.body;
                const createTeamMember = await createNewTeamMember(data);
                res.status(200).json(createTeamMember)
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        }

        //Edit Team Member
        this.editSingleTeamMember = async function (req, res, next) {
            const errors = validationResult(req);
            try {
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        status: "validation error",
                        error: errors.mapped()
                    });
                }
                var teamMemberId = req.params.id
                var editTeamMember = await updateSingleTeamMember(teamMemberId, req.body);
                res.status(200).json(editTeamMember);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };

        //Fetch all Team Members
        this.fetchAllTeamMembers = async function (req, res, next) {
            try {
                var allTeamMembers = await getAllTeamMembers();
                res.status(200).json(allTeamMembers);
            } catch (error) {
                res.status(403).json({
                    status: false,
                    message: error.message
                })
            }
        }

        //Fetch single Team Member
        this.fetchSingleTeamMember = async function (req, res, next) {
            try {
                var teamMemberId = req.params.id
                const fetchSingleTeamMember = await getSingleTeamMember(teamMemberId);
                res.status(200).json(fetchSingleTeamMember);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };

        //Delete single Team member
        this.deleteSingleTeamMember = async function (req, res, next) {
            try {
                var teamMemberId = req.params.id
                const deleteTeamMember = await deleteSingleTeamMember(teamMemberId);
                res.status(200).json(deleteTeamMember);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };

    }

}

module.exports = Team;