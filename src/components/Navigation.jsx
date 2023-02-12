import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import { CalendarMonthRounded, DashboardRounded, HomeRounded } from "@mui/icons-material";

export function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [shortcut, setShortcut] = useState(null);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const updateLocalStorage = () => {
    const localShortcut = window.localStorage.quickShortcut;

    if (localShortcut) setShortcut(JSON.parse(localShortcut));
    else setShortcut(null);
  };

  useEffect(() => {
    updateLocalStorage();
  }, []);

  window.addEventListener("storage", () => {
    updateLocalStorage();
  });

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <div id="bug-menu">
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/students/otp">ОТП</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/teachers">Преподаватели</MenuItem>
        </Menu>
      </div>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeRounded />} component={Link} to="/" />
        <BottomNavigationAction label="Расписание" icon={<CalendarMonthRounded />} onClick={handleClick} />
        {!shortcut
          ? null
          : <BottomNavigationAction
            label={shortcut.group}
            icon={<DashboardRounded />}
            component={Link}
            to={`/students/${shortcut.department}/${shortcut.group}`}
          />
        }
      </BottomNavigation>
    </Paper>
  );
}
