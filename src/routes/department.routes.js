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
    "Error creating department"
  )
);

router.get(
  '/:id',
  generalMiddleware.controllerWrapper(
    DepartmentController.get,
      "Error Fetching department"
  )
);

router.put(
  '/:id',
  generalMiddleware.controllerWrapper(
      DepartmentController.edit,
      "Error Updating department"
  )
);

router.delete(
  '/:id',
  generalMiddleware.controllerWrapper(
      DepartmentController.delete,
      "Error Deleting department"
  )
);

export { module, router };
