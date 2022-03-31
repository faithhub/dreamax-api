const { check, validationResult } = require('express-validator');

//Fetch Recent Activities (fetches the latest created tickets limited by 10)
exports.FetchRecentAcitvity = async function (req, res, next) {
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

//Fetch Dashboard Summary (total ticket assigned, open and closed ticket of the current logged in admin)
exports.fetchDashboardSummary = async function (req, res, next) {
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