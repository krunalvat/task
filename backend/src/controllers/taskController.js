import { TaskService, StatusCode } from "../services/index.js";

//create task
const createTask = async (req, res) => {
  try {
    let taskData = req.body;

    taskData = {
      ...taskData,
      user_id: req.user.id,
    };

    const data = await TaskService.createTask(res, taskData);

    const message = "Task created successfully.";
    return StatusCode.sendCreateResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update task
const updateTask = async (req, res) => {
  try {
    let taskData = req.body;
    const data = await TaskService.updateTask(res, req.params.id, taskData);

    const message = "Task updated successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update task status
const updateTaskStatus = async (req, res) => {
    try {
      let taskData = req.body;
      const data = await TaskService.updateTaskStatus(res, req.params.id, taskData);
  
      const message = "Task status updated successfully.";
      return StatusCode.sendSuccessResponse(res, message, data);
    } catch (error) {
      const message = error.message;
      return StatusCode.InternalErrorResponse(res, message);
    }
  };

//delete task
const deleteTask = async (req, res) => {
  try {
    const data = await TaskService.deleteTask(res, req.params.id);

    const message = "Task deleted successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};


//get users all tasks
const getUserTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const { is_completed } = req.query;
  
      const data = await TaskService.getUserTasks(userId, is_completed);
  
      const message = "User tasks retrieved successfully.";
      return StatusCode.sendSuccessResponse(res, message, data);
    } catch (error) {
      const message = error.message;
      return StatusCode.InternalErrorResponse(res, message);
    }
  };
export const TaskController = {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getUserTasks,
};
