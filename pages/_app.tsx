import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import { Navigation } from "../components";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({ palette: { mode: mode === "light" ? "light" : "dark" } }), [mode]);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(colorScheme.matches ? "dark" : "light");
    colorScheme.addEventListener("change", event => setMode(event.matches ? "dark" : "light"));
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>YMK</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Navigation />
      </ThemeProvider>
    </div>
  );
}
