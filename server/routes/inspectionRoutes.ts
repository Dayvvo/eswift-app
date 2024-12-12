import { Router } from "express";
import inspectionController from "../controllers/inspectionController";
import { validateRequestMiddleware } from "../utils/middleware/request-validator.middleware";
import { WatchAsyncController } from "../lib/watch-async-controller";
import {
  createInspectionValidatorSchema,
  getAllInspectionsValidation,
  deleteInspection,
} from "../utils/validation";

const inspectionRouter = Router();

inspectionRouter.post(
  "/",
  validateRequestMiddleware(createInspectionValidatorSchema, "body"),
  WatchAsyncController(inspectionController.createInspection)
);

inspectionRouter.get(
  "/",
  validateRequestMiddleware(getAllInspectionsValidation, "params"),
  WatchAsyncController(inspectionController.getAllInspections)
);

inspectionRouter.get("/:id");

inspectionRouter.delete(
  `/:id`,
  validateRequestMiddleware(deleteInspection, "params"),
  WatchAsyncController(inspectionController.deleteInspection)
);

inspectionRouter.patch("/:id");

export default inspectionRouter;
