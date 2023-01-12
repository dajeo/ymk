import { useState, useEffect, MouseEvent } from "react";
import {
  BottomNavigation,
  BottomNavigationAction, ListItemIcon, ListItemText,
  Menu,
  MenuItem,
  Paper
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import { SettingsDrawer } from "./SettingsDrawer";

interface Shortcut {
  department: string
  group: string
}

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorMenuEl);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  const handleDrawerClick = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };
  const updateLocalStorage = () => {
    const localShortcut = window.localStorage.quickShortcut;

    if (localShortcut) setShortcut(JSON.parse(localShortcut));
    else setShortcut(null);
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      updateLocalStorage();
    });

    updateLocalStorage();
  }, []);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <Menu
        anchorEl={anchorMenuEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        sx={{ backdropFilter: "blur(4px)" }}
      >
        <MenuItem component={Link} href="/students/otp">
          <ListItemIcon>
            <ReorderRoundedIcon />
          </ListItemIcon>
          <ListItemText>ОТП</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/teachers">
          <ListItemIcon>
            <PeopleRoundedIcon />
          </ListItemIcon>
          <ListItemText>Преподаватели</ListItemText>
        </MenuItem>
      </Menu>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{ backdropFilter: "blur(4px)" }}
      >
        <SettingsDrawer />
      </Drawer>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeRoundedIcon />} component={Link} href="/" />
        <BottomNavigationAction label="Расписание" icon={<CalendarMonthRoundedIcon />} onClick={handleMenuClick} />
        {!shortcut
          ? null
          : <BottomNavigationAction
              label={shortcut.group}
              icon={<DashboardRoundedIcon />}
              component={Link}
              href={`/students/${shortcut.department}/${shortcut.group}`}
          />
        }
        <BottomNavigationAction label="Настройки" icon={<SettingsRoundedIcon />} onClick={handleDrawerClick} />
      </BottomNavigation>
    </Paper>
  );
}
