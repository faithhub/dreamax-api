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

router.get(
    '/',
    generalMiddleware.controllerWrapper(
        FeedBackController.index,
        "Error Fetching feedbacks"
    )
    );

router.get(
    '/:id',
    generalMiddleware.controllerWrapper(
        FeedBackController.get,
        "Error Fetching feedbacks"
    )
    );

router.get(
    '/ticket/:ticketId',
    generalMiddleware.controllerWrapper(
        FeedBackController.getByTicket,
        "Error Fetching feedbacks"
    )
    );

export { module, router }


