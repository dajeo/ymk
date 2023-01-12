import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  createTheme,
  CssBaseline, Snackbar,
  ThemeProvider
} from "@mui/material";
import { Navigation, NewDomainDialog } from "../components";
import { useSnowflakes, useVersion } from "../utils/api";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import Snowflakes from "magic-snowflakes";

const version = "3.1";

export default function App({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = useVersion(version);
  const { sfData, sfError, sfIsLoading } = useSnowflakes();
  const [sf, setSf] = useState<Snowflakes | null>(null);
  const [mode, setMode] = useState("light");
  const [snackOpen, setSnackOpen] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { mode: mode === "light" ? "light" : "dark" } }), [mode]);

  useEffect(() => {
    const tempSf = new Snowflakes({
      minSize: 1,
      maxSize: 8
    });
    tempSf.hide();
    setSf(tempSf);

    const storageTheme = window.localStorage.theme;

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (storageTheme === "system") {
      colorScheme.addEventListener("change", event => setMode(event.matches ? "dark" : "light"));
      setMode(colorScheme.matches ? "dark" : "light");
    } else setMode(storageTheme);

    window.addEventListener("storage", () => {
      const tempTheme = window.localStorage.theme;
      if (!tempTheme) return;
      if (tempTheme === "system") setMode(colorScheme.matches ? "dark" : "light");
      else setMode(tempTheme);
    });
  }, []);

  useEffect(() => {
    if (isLoading || error) return;
    setSnackOpen(!data.latest);
  }, [data, error, isLoading]);

  useEffect(() => {
    if (!sf || sfIsLoading || sfError) return;
    if (sfData.isNewYear) sf.show();
    else sf.hide();
  }, [sf, sfData, sfError, sfIsLoading]);

  function handleClose() {
    setSnackOpen(false);
    location.reload();
  }

  const action = <Button color="inherit" size="small" onClick={handleClose}>Перезагрузить</Button>;

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>YMK</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NewDomainDialog />

        <Snackbar
          sx={{ mb: "56px" }}
          open={snackOpen}
          autoHideDuration={6000}
          message="Вы просматриваете устаревшую версию"
          action={action}
        />

        <Component {...pageProps} />
        <Analytics />

        <Navigation />
      </ThemeProvider>
    </div>
  );
}
