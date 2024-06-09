import express from "express";
import { TaskController } from "../controllers/index.js";
import { taskValidation } from "../validations/index.js";
import validate from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router
  .post(
    "/create",
    auth(),
    validate(taskValidation.createTask),
    TaskController.createTask
  )
  .put(
    "/:id",
    auth(),
    validate(taskValidation.updateTask),
    TaskController.updateTask
  )
  .patch(
    "/:id/completed",
    auth(),
    validate(taskValidation.updateTaskStatus),
    TaskController.updateTaskStatus
  )
  .delete(`/:id`, auth(), TaskController.deleteTask)
  .get("/", auth(), TaskController.getUserTasks);

export default router;
