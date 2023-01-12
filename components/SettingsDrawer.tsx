import { useState, useEffect, MouseEvent } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";

export function SettingsDrawer() {
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
    <Box sx={{ p: "10px" }}>
      <List>
        <Typography variant="overline">Тема</Typography>
        <br />
        <ToggleButtonGroup
          value={theme}
          size="small"
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="light">Светлая</ToggleButton>
          <ToggleButton value="system">Системная</ToggleButton>
          <ToggleButton value="dark">Темная</ToggleButton>
        </ToggleButtonGroup>
      </List>
    </Box>
  );
}
