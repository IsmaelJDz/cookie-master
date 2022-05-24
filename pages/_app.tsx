import { useState, useEffect } from "react";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import type { AppContext, AppProps } from "next/app";

import { darkTheme, lightTheme, customTheme } from "../theme";

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = "dark" }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "light";

    const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;

    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "light" };

//   const validThemes = ["light", "dark", "custom"];

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
//};

export default MyApp;
