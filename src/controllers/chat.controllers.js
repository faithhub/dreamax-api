// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const { sendMessage, getAllRoomConversation, checkRoomExist } = require('../services/chat.service')
// const validate = require("../validations/support.validations");

const fetchAllRoomConversations = async function (req, res, next) {
    const { roomId } = req.query
    const messages = await getAllRoomConversation(roomId);
    res.status(200).json(messages)
}

const home = async function (req, res, next) {
    res.status(201).json({ message: "Well done" });
}

module.exports = { 
    fetchAllRoomConversations, 
    home 
}
