import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddTaskModel = ({ open, onClose, token, onSuccess }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_URL}/tasks/create`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onSuccess(response.data);
        handleClose();
      } else {
        setError(response.data.message);
        console.error("Failed to create task:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create task. Please try again later.");
      }
    }
  };

  const handleClose = () => {
    setNewTask({
      title: "",
      description: "",
    });
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the new task.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          value={newTask.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          fullWidth
          value={newTask.description}
          onChange={handleChange}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModel;
