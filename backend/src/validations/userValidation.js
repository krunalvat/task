import Joi from "joi";
import { EmailId, Password } from "./custom.js";

export const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required().custom(Password),
    email: Joi.string().required().custom(EmailId),
  }),
};

export const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(EmailId),
    password: Joi.string().required().custom(Password),
  }),
};

export const updateUser = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string().custom(Password),
    email: Joi.string().custom(EmailId),
  }),
};

export const userValidation = {
  createUser,
  loginUser,
  updateUser,
};
