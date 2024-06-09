import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          return `Failed to fetch user: ${response.data.message}`;
        }
      } catch (error) {
        return `Error fetching user:, ${error.message}`
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: '#EEEEEE',
        height: "100vh",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
          <AssignmentTurnedInIcon sx={{ fontSize: "2rem", mr: 1 }} />
          <Typography variant="h6" align="center">
            Task Management App
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
        <ListItem onClick={() => handleNavigation('/dashboard')}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem onClick={() => handleNavigation('/tasks')}>
            <ListItemText primary="Tasks" />
          </ListItem>
        </List>
      </Box>
      <Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {user && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar sx={{ mr: 1 }}>
                  {user.first_name[0]}
                  {user.last_name[0]}
                </Avatar>
                <Typography variant="body1">
                  {user.first_name} {user.last_name}
                </Typography>
              </Box>
              <IconButton onClick={onLogout}>
                <LogoutIcon
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
