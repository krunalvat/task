import jwt from "jsonwebtoken";
import { StatusCode } from "../services/index.js";

// Auth for decoded tokens.
export const auth = () => async (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    const message = "No token provided.";
    return StatusCode.sendBadRequestResponse(res, message);
  }

  const tokenArray = headerToken.split(" ");

  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    const message = "Invalid token format.";
    return StatusCode.sendBadRequestResponse(res, message);
  }

  const token = tokenArray[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      email: decodedToken.email,
      id: decodedToken.userId,
    };
    next();
  } catch (error) {
    const message = "Invalid or expired token.";
    return StatusCode.sendUnauthorizedResponse(res, message);
  }
};

// Function to decode the token.
export const DecodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const message = "Token has expired.";
      return StatusCode.sendUnauthorizedResponse(res, message);
    } else {
      const message = "Token verification failed.";
      return StatusCode.sendUnauthorizedResponse(res, message);
    }
  }
};
