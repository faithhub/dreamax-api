const { Router } = require('express');
const { fetchAllRoomConversations } = require('../controllers/chat.controllers')


const router = Router();
const module = "chat";

router.get('/room/messages', fetchAllRoomConversations)

router.get('/get2', function(req, res, next){
    res.status(200).json({status:"success"})
})


export { module, router }
