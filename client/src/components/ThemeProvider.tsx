import React, { createContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ITheme } from "../interfaces/Interfaces";

export const ThemeContext = createContext({
  theme: {},
  setMainTheme: (obj: ITheme) => {}
});

interface IProps {
  children: any,
  initialTheme: ITheme
}
const ThemeProvider = ({ children, initialTheme} :IProps,) => {
  
  const [theme, setTheme] = useState<ITheme>(initialTheme);

  const setMainTheme = (newTheme: ITheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setMainTheme
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
