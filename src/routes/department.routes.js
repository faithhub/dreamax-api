import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import DepartmentController from "../controllers/department.controller";

const router = Router();
const module = "department";


router.get('/',
  generalMiddleware.controllerWrapper(
    DepartmentController.index,
    "Error fetching departments")
);

router.post(
  "/",
  generalMiddleware.controllerWrapper(
    DepartmentController.create,
    "Error creating messages"
  )
);

// router.get('/fetchSingleDepartment/:id', DepartmentController.fetchSingleDepartment);
// router.put('/editSingleDepartment/:id', DepartmentValidation('createDepartment'), DepartmentController.editSingleDepartment);
// router.delete('/deleteSingleDepartment/:id', DepartmentController.deleteSingleDepartment);

export { module, router };
