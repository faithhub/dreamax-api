import { Router } from "express";
import DashboardController from "../controllers/dashboard.controllers"

const router = Router();
const module = "dashboard";

router.get('/recentActivities', DashboardController.FetchRecentAcitvity);
router.get('/fetchDashboardSummary', DashboardController.fetchDashboardSummary);


export { module, router };