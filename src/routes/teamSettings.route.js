import { Router } from 'express';
import generalMiddleware from '../middleware/general.middleware';
import TeamSettingsController from '../controllers/teamSettings.controller';

const router = Router();
const module = "teamSettings";

router.get(
    '/:adminId',
    generalMiddleware.controllerWrapper(
        TeamSettingsController.get,
        "Error Fetching team settings"
    )
);

router.put(
    '/:adminId',
    generalMiddleware.controllerWrapper(
        TeamSettingsController.edit,
        "Error Updating team settings"
    )
);



export { module, router }