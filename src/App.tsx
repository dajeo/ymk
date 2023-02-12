import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import * as Pages from "./views";
import { Navigation, NotFoundError } from "./components";

function App() {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(colorScheme.matches ? "dark" : "light");
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: "#1f5290"
      }
    }
  }), [mode]);

  colorScheme.addEventListener("change", event => setMode(event.matches ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Pages.Home />} />
          <Route path={"/teachers"} element={<Pages.Teachers />} />
          <Route path={"/teachers/:teacher"} element={<Pages.TeacherSchedule />} />
          <Route path={"/students/:department"} element={<Pages.Groups />} />
          <Route path={"/students/:department/:group"} element={<Pages.GroupSchedule />} />
          <Route path={"*"} element={<NotFoundError />} />
        </Routes>

        <Navigation />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
