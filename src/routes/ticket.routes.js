import { Router } from 'express';
import generalMiddleware from '../middleware/general.middleware';
import TicketController from '../controllers/ticket.controller';

const router = Router();
const module = "ticket";

router.post(
    '/',
    generalMiddleware.controllerWrapper(
        TicketController.create,
        "Error Creating ticket"
    )
);

router.get(
    '/',
    generalMiddleware.controllerWrapper(
        TicketController.index,
        "Error Fetching tickets"
    )
);

router.get(
    '/:id',
    generalMiddleware.controllerWrapper(
        TicketController.get,
        "Error Fetching ticket"
    )
);

router.put(
    '/:id',
    generalMiddleware.controllerWrapper(
        TicketController.edit,
        "Error Updating ticket"
    )
);

router.delete(
    '/:id',
    generalMiddleware.controllerWrapper(
        TicketController.delete,
        "Error Deleting ticket"
    )
);



export { module, router }