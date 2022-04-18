import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import DepartmentController from "../controllers/department.controller";
import departmentMiddleware from "../middleware/department.middleware";

const router = Router();
const module = "department";

router.get(
  "/",
  departmentMiddleware.getAll,
  generalMiddleware.controllerWrapper(
    DepartmentController.index,
    "Error fetching departments"
  )
);

router.post(
  "/",
  departmentMiddleware.createDept,
  generalMiddleware.controllerWrapper(
    DepartmentController.create,
    "Error creating department"
  )
);

router.get(
  "/:id",
  departmentMiddleware.getDept,
  generalMiddleware.controllerWrapper(
    DepartmentController.get,
    "Error Fetching department"
  )
);

router.put(
  "/:id",
  departmentMiddleware.editDept,
  generalMiddleware.controllerWrapper(
    DepartmentController.edit,
    "Error Updating department"
  )
);

router.delete(
  "/:id",
  departmentMiddleware.deleteDept,
  generalMiddleware.controllerWrapper(
    DepartmentController.delete,
    "Error Deleting department"
  )
);

export { module, router };
