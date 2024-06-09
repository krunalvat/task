import express from "express";
import { UserController } from "../controllers/index.js";
import { userValidation } from "../validations/index.js";
import validate from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router
  .post(
    "/create",
    validate(userValidation.createUser),
    UserController.createUser
  )
  .post("/login", validate(userValidation.loginUser), UserController.loginUser)
  .get("/", auth(), UserController.getUser)
  .patch(
    "/",
    auth(),
    validate(userValidation.updateUser),
    UserController.updateUser
  )
  .delete(`/:id`, UserController.deleteUser);

export default router;
