import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import TeamController from "../controllers/team.controllers";

const router = Router();
const module = "team";


router.get('/',
  generalMiddleware.controllerWrapper(
    TeamController.index,
    "Error fetching teams")
);

router.post(
  "/",
  generalMiddleware.controllerWrapper(
    TeamController.create,
    "Error creating team"
  )
);
router.get(
  '/:id',
  generalMiddleware.controllerWrapper(
    TeamController.get,
      "Error Fetching team"
  )
);

router.put(
  '/:id',
  generalMiddleware.controllerWrapper(
      TeamController.edit,
      "Error Updating team"
  )
);

router.delete(
  '/:id',
  generalMiddleware.controllerWrapper(
      TeamController.delete,
      "Error Deleting team"
  )
);

router.put(
  '/status/:id',
  generalMiddleware.controllerWrapper(
      TeamController.status,
      "Error updating status"
  )
);

export { module, router };
