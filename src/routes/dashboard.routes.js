import { Router } from "express";
import dashboardController from "../controllers/dashboard.controllers"

const router = Router();
const module = "dashboard";
const DashboardController = new dashboardController();

router.get('/recentActivities', DashboardController.FetchRecentAcitvity);
router.get('/fetchDashboardSummary', DashboardController.fetchDashboardSummary);

export { module, router };