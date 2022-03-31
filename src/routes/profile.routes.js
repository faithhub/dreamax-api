import { Router } from "express";
import ProfileController from "../controllers/profile.controllers"
import ProfileValidation from "../validations/profile.validations"

const router = Router();
const module = "profile";

router.put('/updatePersonalDetails/:id', ProfileController.updatePersonalDetails);
router.put('/updateProfileSetting/:id', ProfileController.updateProfileSetting);

export { module, router };