import httpStatus from "http-status";

// status(201).
export const sendCreateResponse = (res, message, data) => {
  return res
    .status(httpStatus.CREATED)
    .json({ status: httpStatus.CREATED, message, data });
};

// status(200).
export const sendSuccessResponse = (res, message, data, token) => {
  const response = { status: httpStatus.OK, message, data };
  if (token) {
    response.token = token;
  }
  return res.status(httpStatus.OK).json(response);
};

// status(400).
export const sendBadRequestResponse = (res, message) => {
  return res
    .status(httpStatus.BAD_REQUEST)
    .json({ status: httpStatus.BAD_REQUEST, message });
};

// status(401).
export const sendUnauthorizedResponse = (res, message) => {
  return res.status(401).json({ success: false, message });
};

// status(404).
export const sendNotFoundResponse = (res, message) => {
  return res
    .status(httpStatus.NOT_FOUND)
    .json({ status: httpStatus.NOT_FOUND, message });
};

// status(500).
export const InternalErrorResponse = (res, message) => {
  if (!res.headersSent) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatus.INTERNAL_SERVER_ERROR, message });
  } else {
    return null;
  }
};

export const StatusCode = {
  sendCreateResponse,
  sendSuccessResponse,
  sendBadRequestResponse,
  sendUnauthorizedResponse,
  sendNotFoundResponse,
  InternalErrorResponse,
};
