import { Router } from "express";
import DepartmentController from "../controllers/department.controller"
import DepartmentValidation from "../validations/department.validations"

const router = Router();
const module = "department";

router.post('/createDepartment', DepartmentValidation('createDepartment'), DepartmentController.createDepartment);
router.get('/fetchAllDepartments', DepartmentController.fetchAllDepartments);
router.get('/fetchSingleDepartment/:id', DepartmentController.fetchSingleDepartment);
router.put('/editDepartment/:id', DepartmentValidation('createDepartment'), DepartmentController.editDepartment);
router.delete('/deleteDepartment/:id', DepartmentController.deleteDepartment);

export { module, router };