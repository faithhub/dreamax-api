const { check, validationResult } = require('express-validator');

// Create a new Department
exports.createDepartment = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: "validation error",
                error: errors.mapped()
            });
        }
        res.status(200).json({
            status: "success",
            message: "test is okay now"
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
}

// Fetch all Departments
exports.fetchAllDepartments = async function (req, res, next) {
    try {
        var allDepartments = [];
        res.status(200).json({
            status: "success",
            message: allDepartments,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Fetch Single Department
exports.fetchSingleDepartment = async function (req, res, next) {
    try {
        var departmentId = req.params.id
        res.status(200).json({
            status: "success",
            message: departmentId,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Edit Department
exports.editDepartment = async function (req, res, next) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: "validation error",
                error: errors.mapped()
            });
        }
        var departmentId = req.params.id
        res.status(200).json({
            status: "success99",
            message: departmentId,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
};

//Delete Department
exports.deleteDepartment = async function (req, res, next) {
    try {
        var teamMemberId = req.params.id
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