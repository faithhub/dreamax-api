import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import ResponseMessageController from "../controllers/responseMessage.controller";

const router = Router();
const module = "responsemessage";

router.post(
  "/",
  generalMiddleware.controllerWrapper(
    ResponseMessageController.create,
    "Error creating messages"
  )
);

router.get(
  "/",
  generalMiddleware.controllerWrapper(
    ResponseMessageController.index,
    "Error Fetching messages"
  )
);

export { module, router };
