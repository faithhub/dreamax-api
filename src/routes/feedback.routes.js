import { Router } from "express";
import feedBackController from "../controllers/feedBack.controller";
import generalMiddleware from "../middleware/general.middleware";
import FeedBackController from "../controllers/feedBack.controller";

const router = Router();
const module = "feedback";

router.post(
  "/",
  generalMiddleware.controllerWrapper(
    FeedBackController.create,
    "Error creating feedback"
  )
);

router.get(
  "/",
  generalMiddleware.controllerWrapper(
    FeedBackController.index,
    "Error Fetching feedbacks"
  )
);

router.get(
  "/:id",
  generalMiddleware.controllerWrapper(
    FeedBackController.get,
    "Error Fetching feedbacks"
  )
);

router.get(
  "/ticket/:ticketId",
  generalMiddleware.controllerWrapper(
    FeedBackController.getByTicket,
    "Error Fetching feedbacks"
  )
);

export { module, router };
