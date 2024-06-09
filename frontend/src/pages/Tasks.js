import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./SideBar";
import AddTaskModel from "../models/addTaskModel";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    _id: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(
    async (filterStatus) => {
      try {
        let url = `${process.env.REACT_APP_PUBLIC_URL}/tasks/`;
        if (filterStatus === "true") {
          url += `?is_completed=true`;
        } else if (filterStatus === "false") {
          url += `?is_completed=false`;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response.data.data);
        } else {
          return `Failed to fetch tasks: ${response.data.message}`;
        }
      } catch (error) {
        return `Error fetching tasks:${error.message}`;
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks(filterStatus === "all" ? "" : filterStatus);
    }
  }, [token, navigate, filterStatus, fetchTasks]);

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      setEditedTask({
        _id: taskToEdit._id,
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
      setOpenEditModal(true);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PUBLIC_URL}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        return `Failed to delete task:" ${response.data.message}`;
      }
    } catch (error) {
      return `Error deleting task:" ${error.message}`;
    }
  };

  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_PUBLIC_URL}/tasks/${taskId}/completed`,
        {
          is_completed: isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task._id === taskId ? { ...task, is_completed: isChecked } : task
          )
        );

        if (isChecked) {
          toast.success("Task marked as completed!");
        } else {
          toast.info("Task status updated to incomplete");
        }
      } else {
        return `Failed to update task:" ${response.data.message}`;
      }
    } catch (error) {
      return `Error updating task:" ${error.message}`;
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTaskAdded = (task) => {
    fetchTasks();
  };

  const handleCloseTask = () => {
    setOpenEditModal(false);
    setEditedTask({
      _id: "",
      title: "",
      description: "",
    });
    setError("");
  };

  const handleChangeTask = (event) => {
    const { name, value } = event.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleEditTask = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PUBLIC_URL}/tasks/${editedTask._id}`,
        {
          title: editedTask.title,
          description: editedTask.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleCloseTask();
        setTasks(
          tasks.map((task) =>
            task._id === editedTask._id ? response.data.data : task
          )
        );
      } else {
        setError(response.data.message);
        return `Failed to update task:" ${response.data.message}`;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update task. Please try again later.");
      }
    }
  };

  return (
    <>
      <Box display="flex" sx={{ bgcolor: "#EEEEEE" }}>
        <Sidebar />
        <Box flexGrow={1} p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingLeft={2}
            paddingRight={4}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h6" sx={{ mt: 4 }}>
                ➤ Your Tasks
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ mt: 2, pl: 2 }}
            >
              <Button
                onClick={handleOpenDialog}
                sx={{
                  color: "grey",
                  borderColor: "grey",
                  textDecoration: "underline",
                  pr: 4,
                  pt: 3,
                }}
              >
                + Add Task
              </Button>
              <TextField
                select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  fetchTasks(e.target.value);
                }}
                sx={{ width: 150, mt: 2 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
                <MenuItem value="false">Incomplete</MenuItem>
              </TextField>
            </Box>
          </Box>
          <ToastContainer />

          <AddTaskModel
            open={openDialog}
            onClose={handleCloseDialog}
            token={token}
            onSuccess={handleTaskAdded}
          />

          <Dialog open={openEditModal} onClose={handleCloseTask}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please update the details of the task.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="Title"
                fullWidth
                value={editedTask.title}
                onChange={handleChangeTask}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                fullWidth
                value={editedTask.description}
                onChange={handleChangeTask}
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseTask}>Cancel</Button>
              <Button
                onClick={handleEditTask}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Box display="flex" sx={{ mt: 2 }}>
            {tasks.length === 0 ? (
              <Typography
                display="flex"
                justifyContent="flex-start"
                sx={{ mt: 2, pl: 3 }}
              >
                No tasks available
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table
                  sx={{
                    borderTop: "1px solid grey",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 7, backgroundColor: "#F6F5F5" }}>
                        Title
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#F6F5F5" }}>
                        Description
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#F6F5F5" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>
                          <Checkbox
                            checked={task.is_completed}
                            onChange={(e) =>
                              handleCheckboxChange(task._id, e.target.checked)
                            }
                          />
                          {task.title}
                        </TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(task._id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(task._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
