import { useState, useEffect, MouseEvent } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem
} from "@mui/material";
import {
  HomeRounded,
  CalendarMonthRounded,
  DashboardRounded
} from "@mui/icons-material";
import Link from "next/link";

interface Shortcut {
  department: string
  group: string
}

export function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);

    const el = document.getElementById("bug-menu");
    if (el) el.remove();
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
          <MenuItem onClick={handleClose} component={Link} href="/students/otp">ОТП</MenuItem>
          <MenuItem onClick={handleClose} component={Link} href="/teachers">Преподаватели</MenuItem>
        </Menu>
      </div>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeRounded />} component={Link} href="/" />
        <BottomNavigationAction label="Расписание" icon={<CalendarMonthRounded />} onClick={handleClick} />
        {!shortcut
          ? null
          : <BottomNavigationAction
              label={shortcut.group}
              icon={<DashboardRounded />}
              component={Link}
              href={`/students/${shortcut.department}/${shortcut.group}`}
          />
        }
      </BottomNavigation>
    </Paper>
  );
}
