import { UserService, StatusCode } from "../services/index.js";

//create user
const createUser = async (req, res) => {
  try {
    let userData = req.body;

    const existingUser = await UserService.getUserByEmail(res, userData.email);

    if (!existingUser) {
      const data = await UserService.createUser(res, userData);

      const message = "User created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "User already exists with this email.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await UserService.loginUser(res, email, password);

    const message = "User logged-in successfully.";
    return StatusCode.sendSuccessResponse(res, message, user, token);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get login user
const getUser = async (req, res) => {
  try {
    const data = await UserService.getUserByEmail(res, req.user.email);

    const message = "User data retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    let userData = req.body;

    const data = await UserService.updateUser(res, req.user.id, userData);

    const message = "User updated successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const data = await UserService.deleteUser(res, req.params.id);

    const message = "User deleted successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const UserController = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
