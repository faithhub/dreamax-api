import { Router } from 'express';
import generalMiddleware from '../middleware/general.middleware';
import ChatController from '../controllers/chat.controllers';

const router = Router();
const module = "chat";

router.post(
    '/',
    generalMiddleware.controllerWrapper(
        ChatController.checkRoomExist,
        "Error creating feedback"
    )
    );

router.post(
    '/send',
    generalMiddleware.controllerWrapper(
        ChatController.sendMessage,
        "Error Fetching feedbacks"
    )
    );

router.get(
    '/:id',
    generalMiddleware.controllerWrapper(
        ChatController.getAllConversation,
        "Error Fetching feedbacks"
    )
    );

router.get(
    '/ticket/:ticketId',
    generalMiddleware.controllerWrapper(
        ChatController.getAllRoomMessages,
        "Error Fetching feedbacks"
    )
    );

export { module, router }


