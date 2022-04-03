const { check, validationResult } = require('express-validator');
const { getAllDepartments, createNewDepartment, fetchSingleDepartment, deleteSingleDepartment, editSingleDepartment } = require("../services/department.service");

class Department {
    constructor() {
        
        // Create a new Department
        this.createDepartment = async function (req, res, next) {
            const errors = validationResult(req);
            try {
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        status: "validation error",
                        error: errors.mapped()
                    });
                }
                const createDepartment = await createNewDepartment(req.body);
                res.status(200).json(createDepartment);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                });
            }
        }

        //Edit Department
        this.editSingleDepartment = async function (req, res, next) {
            const errors = validationResult(req);
            try {
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        status: "validation error",
                        error: errors.mapped()
                    });
                }
                var departmentId = req.params.id
                const editDepartment = await editSingleDepartment(departmentId, req.body);
                res.status(200).json(editDepartment);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };

        // Fetch all Departments
        this.fetchAllDepartments = async function (req, res, next) {
            try {
                const allDepartments = await getAllDepartments();
                res.status(200).json(allDepartments);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };

        //Fetch Single Department
        this.fetchSingleDepartment = async function (req, res, next) {
            try {
                var departmentId = req.params.id
                const getDepartment = await fetchSingleDepartment(departmentId);
                res.status(200).json(getDepartment);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };


        //Delete Department
        this.deleteSingleDepartment = async function (req, res, next) {
            try {
                var departmentId = req.params.id
                const deleteDepartment = await deleteSingleDepartment(departmentId);
                res.status(200).json(deleteDepartment);
            } catch (error) {
                res.status(403).json({
                    message: error.message
                })
            }
        };
    }
}

module.exports = Department;