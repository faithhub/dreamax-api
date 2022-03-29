const ChatSupport= require("../db/models/support.models");
const validate = require("../validations/support.validations");

const text = async function (req, res, next) {
    res.status(200).json(
        {
            message: "test is okay now"
        }
    )
}

const home = async function (req, res, next) {
    res.status(201).json({ message: "Well done" });
}

export default { text, home }