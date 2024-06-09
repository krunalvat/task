// validation/taskValidation.js
import Joi from "joi";

export const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

export const updateTask = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
};

export const updateTaskStatus = {
  body: Joi.object().keys({
    is_completed: Joi.boolean(),
  }),
};

export const taskValidation = {
  createTask,
  updateTask,
  updateTaskStatus,
};
