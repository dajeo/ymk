import { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  List,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import {
  LightModeRounded,
  SettingsBrightnessRounded,
  DarkModeRounded,
  CloseRounded
} from "@mui/icons-material";

interface Props {
  handleClose: () => void
}

export function SettingsDrawer({ handleClose }: Props) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const temp = window.localStorage.theme;
    if (!temp) return;
    setTheme(temp);
  }, []);

  function handleChange(e: MouseEvent<HTMLElement>, newTheme: string) {
    setTheme(newTheme);
    window.localStorage.theme = newTheme;
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <Box>
      <Box sx={{ p: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Настройки</Typography>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ p: "10px" }}>
        <Typography variant="overline">Тема</Typography>
        <br />
        <ToggleButtonGroup
          value={theme}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="light">
            <LightModeRounded sx={{ mr: "6px" }} />
            Светлая
          </ToggleButton>
          <ToggleButton value="system">
            <SettingsBrightnessRounded sx={{ mr: "6px" }} />
            Системная
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeRounded sx={{ mr: "6px" }} />
            Темная
          </ToggleButton>
        </ToggleButtonGroup>
      </List>
    </Box>
  );
}
