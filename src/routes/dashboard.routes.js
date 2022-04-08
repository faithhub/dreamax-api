import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import DashboardController from "../controllers/dashboard.controllers";

const router = Router();
const module = "dashboard";

router.get(
  "/:adminId",
  generalMiddleware.controllerWrapper(
    DashboardController.index,
    "Error fetching teams"
  )
);

export { module, router };
