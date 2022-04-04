import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import departmentController from "../controllers/department.controller";
import DepartmentValidation from "../validations/department.validations";

const router = Router();
const module = "department";
const DepartmentController = new departmentController();

router.post(
  "/",
  generalMiddleware.controllerWrapper(
    DepartmentValidation("createDepartment"),
    DepartmentController.createDepartment,
    "Error creating messages"
  )
);
// router.get('/fetchAllDepartments', DepartmentController.fetchAllDepartments);
// router.get('/fetchSingleDepartment/:id', DepartmentController.fetchSingleDepartment);
// router.put('/editSingleDepartment/:id', DepartmentValidation('createDepartment'), DepartmentController.editSingleDepartment);
// router.delete('/deleteSingleDepartment/:id', DepartmentController.deleteSingleDepartment);

export { module, router };
