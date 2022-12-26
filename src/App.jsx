import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Button,
  createTheme,
  CssBaseline, Snackbar,
  ThemeProvider
} from "@mui/material";
import * as Pages from "./pages";
import { Navigation, NewDomainDialog } from "./components";
import { useVersion } from "./api";
import { version } from "../config.json";

function App() {
  const { data, isLoading } = useVersion(version);
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(colorScheme.matches ? "dark" : "light");
  const [snackOpen, setSnackOpen] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  colorScheme.addEventListener("change", event => setMode(event.matches ? "dark" : "light"));

  useEffect(() => {
    if (isLoading) return;
    setSnackOpen(!data.latest);
  }, [data]);

  function handleClose() {
    setSnackOpen(false);
    location.reload();
  }

  const action = <Button color={"inherit"} size={"small"} onClick={handleClose}>Перезагрузить</Button>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NewDomainDialog />

        <Snackbar
          sx={{ mb: "56px" }}
          open={snackOpen}
          autoHideDuration={6000}
          message={"Вы сейчас просматриваете устаревшую версию"}
          action={action}
        />

        <Routes>
          <Route path={"/"} element={<Pages.Home />} />
          <Route path={"/teachers"} element={<Pages.Teachers />} />
          <Route path={"/teachers/:teacher"} element={<Pages.TeacherSchedule />} />
          <Route path={"/students/:department"} element={<Pages.Groups />} />
          <Route path={"/students/:department/:group"} element={<Pages.Schedule />} />
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
