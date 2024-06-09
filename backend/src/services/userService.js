import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { StatusCode } from "../services/index.js";

//create user
const createUser = async (res, userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    // Generate JWT token
    const token = generateToken(savedUser);

    return { user: savedUser, token };
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//generate token
const generateToken = (userData) => {
  const payload = {
    userId: userData._id,
    email: userData.email,
  };

  // Sign the token with your secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

//get user by email
const getUserByEmail = async (res, email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    const message = "User not Found with this email address.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//login user
const loginUser = async (res, email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const message = "User not fount with this email.";
    return StatusCode.sendBadRequestResponse(res, message);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const message = "Invalid password.";
    return StatusCode.sendBadRequestResponse(res, message);
  } else {
    const token = generateToken(user);
    return { user, token };
  }
};

//update user
const updateUser = async (res, userId, userData) => {
  try {
    let hashedPassword;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    const updatedData = {
      ...userData,
      password: hashedPassword,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      const message = "User not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return updatedUser;
  } catch (error) {
    const message = "Error updating user by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//delete user
const deleteUser = async (res, userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId, { new: true });
    if (!deletedUser) {
      const message = "User not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return deletedUser;
  } catch (error) {
    const message = "Error updating user by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

export const UserService = {
  createUser,
  loginUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
