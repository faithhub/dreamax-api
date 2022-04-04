// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// const { sendMessage, getAllRoomConversation, checkRoomExist } = require('../services/chat.service')
// const validate = require("../validations/support.validations");

// const fetchAllRoomConversations = async function (req, res, next) {
//     const { roomId } = req.query
//     const messages = await getAllRoomConversation(roomId);
//     res.status(200).json(messages)
// }

// const roomExist = async function (req, res, next) {
//     const { ticketId } = req.query
//     const room = await checkRoomExist(ticketId);
//     res.status(200).json(room)
// }

// module.exports = { 
//     fetchAllRoomConversations, 
//     roomExist 
// }
