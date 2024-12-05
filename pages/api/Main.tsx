import React, { useMemo } from "react";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../styles/theme";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useSelector } from "react-redux";

type Props = {
  Component?: any;
  pageProps?: any;
};

const Main = (props: Props) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};

export default Main;
