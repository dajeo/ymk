import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import * as Pages from "./pages";
import { Navigation } from "./components";

function App() {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(colorScheme.matches ? "dark" : "light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

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
          <Route path={"*"} element={
            <h1 style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 78px)"
            }}>Page not found</h1>
          } />
        </Routes>

        <Navigation />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
