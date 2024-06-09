import { Task } from "../models/index.js";
import { StatusCode } from "../services/index.js";

//create task
const createTask = async (res, taskData) => {
  try {
    const task = new Task(taskData);
    const savedTask = await task.save();

    return savedTask;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update task
const updateTask = async (res, taskId, taskData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
    });

    if (!updatedTask) {
      const message = "Task not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return updatedTask;
  } catch (error) {
    const message = "Error updating Task by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//update task status
const updateTaskStatus = async (res, taskId, taskData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
    });

    if (!updatedTask) {
      const message = "Task status not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return updatedTask;
  } catch (error) {
    const message = "Error updating Task status by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//delete task
const deleteTask = async (res, taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId, { new: true });
    if (!deletedTask) {
      const message = "Task not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return deletedTask;
  } catch (error) {
    const message = "Error updating task by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

const getUserTasks = async (userId, is_completed) => {
  try {
    let query = { user_id: userId };
    if (is_completed === "true") {
      query.is_completed = true;
    } else if (is_completed === "false") {
      query.is_completed = false;
    }

    return await Task.find(query).sort({ created_at: -1 });
  } catch (error) {
    const message = "Error in finding user tasks.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

export const TaskService = {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getUserTasks,
};
