import { useState, useEffect, MouseEvent } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper
} from "@mui/material";
import {
  HomeRounded,
  CalendarMonthRounded,
  ReorderRounded,
  PeopleRounded,
  DashboardRounded,
  SettingsRounded
} from "@mui/icons-material";
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

  function handleDrawerClick() {
    setDrawerOpen(true);
  }
  function handleDrawerClose() {
    setDrawerOpen(false);
  }
  function handleMenuClick(e: MouseEvent<HTMLButtonElement>) {
    setAnchorMenuEl(e.currentTarget);
  }
  function handleMenuClose() {
    setAnchorMenuEl(null);
  }
  function updateLocalStorage() {
    const localShortcut = window.localStorage.quickShortcut;

    if (localShortcut) setShortcut(JSON.parse(localShortcut));
    else setShortcut(null);
  }

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
      >
        <MenuItem component={Link} href="/students/otp">
          <ListItemIcon>
            <ReorderRounded />
          </ListItemIcon>
          <ListItemText>ОТП</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/teachers">
          <ListItemIcon>
            <PeopleRounded />
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
      >
        <SettingsDrawer handleClose={handleDrawerClose} />
      </Drawer>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeRounded />} component={Link} href="/" />
        <BottomNavigationAction label="Расписание" icon={<CalendarMonthRounded />} onClick={handleMenuClick} />
        {!shortcut
          ? null
          : <BottomNavigationAction
              label={shortcut.group}
              icon={<DashboardRounded />}
              component={Link}
              href={`/students/${shortcut.department}/${shortcut.group}`}
          />
        }
        <BottomNavigationAction label="Настройки" icon={<SettingsRounded />} onClick={handleDrawerClick} />
      </BottomNavigation>
    </Paper>
  );
}
