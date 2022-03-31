const { check, validationResult } = require('express-validator');

//Update Profile Settings (Updates settings on a team member or admin profile)
exports.updateProfileSetting = async function (req, res, next) {
    try {
        var recentActivities = [];
        res.status(200).json({
            status: "success",
            message: recentActivities,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
}

//Update Personal Details (updates tean member personal detail)
exports.updatePersonalDetails = async function (req, res, next) {
    try {
        var recentActivities = [];
        res.status(200).json({
            status: "success",
            message: recentActivities,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
}