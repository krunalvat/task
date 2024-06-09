import Joi from "joi";
import Pick from "../utils/pick.js";
import { StatusCode } from "../services/index.js";

const validate = (schema) => (req, res, next) => {
  const validSchema = Pick(schema, ["params", "query", "body"]);
  const object = Pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const message = error.details.map((details) => details.message).join(", ");

    return StatusCode.sendBadRequestResponse(res, message);
  }

  Object.assign(req, value);
  return next();
};

export default validate;
