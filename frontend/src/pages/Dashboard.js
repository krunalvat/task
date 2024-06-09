import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Sidebar from "./SideBar";
import AddTaskModel from "../models/addTaskModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const token = localStorage.getItem("token");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTaskAdded = (task) => {
    toast.success("Task added as successfully!");
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={4}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1">
          You can add your tasks from below
        </Typography>
        <ToastContainer />

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
        <AddTaskModel
          open={openDialog}
          onClose={handleCloseDialog}
          token={token}
          onSuccess={handleTaskAdded}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
