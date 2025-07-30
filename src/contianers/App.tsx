import { Component, createSignal, createMemo } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { ThemeProvider, CssBaseline, Typography } from "@suid/material";
import { makePersisted } from "@solid-primitives/storage";
import { darkTheme, lightTheme } from "../theme";
import Home from "./Home";
import Demo from "./Demo";
import Template from './Template';
import SwaggerDocs from "./SwaggerDocs"
const App: Component = () => {
  const [themeMode, setThemeMode] = makePersisted(
    createSignal<"dark" | "light">("dark"),
    {
      name: "themeMode",
    },
  );

  const theme = createMemo(() =>
    themeMode() === "dark" ? darkTheme : lightTheme,
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route
          path="/"
          component={() => (
            <Home themeMode={themeMode} setThemeMode={setThemeMode} />
          )}
        />
        <Route
          path="/demo"
          component={() => (
            <Demo themeMode={themeMode} setThemeMode={setThemeMode} />
          )}
        />
        <Route
          path="/template"
          component={() => (
            <Template themeMode={themeMode} setThemeMode={setThemeMode} />
          )}
        />
        <Route
          path="/swagger"
          component={() => (
            <SwaggerDocs themeMode={themeMode} setThemeMode={setThemeMode} />
          )}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
