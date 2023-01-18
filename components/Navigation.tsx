import { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";
import {
  HomeRounded,
  CalendarMonthRounded,
  DashboardRounded,
  SettingsRounded
} from "@mui/icons-material";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import { SettingsDrawer } from "./SettingsDrawer";
import { ScheduleDrawer } from "./ScheduleDrawer";

interface Shortcut {
  department: string
  group: string
}

export function Navigation() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  function handleSettingsClick() {
    setSettingsOpen(true);
  }
  function handleSettingsClose() {
    setSettingsOpen(false);
  }
  function handleScheduleClick() {
    setScheduleOpen(true);
  }
  function handleScheduleClose() {
    setScheduleOpen(false);

    const el = document.getElementById("bug-drawer");
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
      <div id="bug-drawer">
        <Drawer
          anchor="bottom"
          open={scheduleOpen}
          onClose={handleScheduleClose}
        >
          <ScheduleDrawer handleClose={handleScheduleClose} />
        </Drawer>
      </div>
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={handleSettingsClose}
      >
        <SettingsDrawer handleClose={handleSettingsClose} />
      </Drawer>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeRounded />} component={Link} href="/" />
        <BottomNavigationAction label="Расписание" icon={<CalendarMonthRounded />} onClick={handleScheduleClick} />
        {!shortcut
          ? null
          : <BottomNavigationAction
              label={shortcut.group}
              icon={<DashboardRounded />}
              component={Link}
              href={`/students/${shortcut.department}/${shortcut.group}`}
          />
        }
        <BottomNavigationAction label="Настройки" icon={<SettingsRounded />} onClick={handleSettingsClick} />
      </BottomNavigation>
    </Paper>
  );
}
