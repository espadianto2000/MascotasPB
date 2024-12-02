import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleColorScheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [forcedColorScheme, setForcedColorScheme] = useState<string | null>(
    null,
  );

  const isDarkMode =
    forcedColorScheme === 'dark' ||
    (forcedColorScheme === null && systemColorScheme === 'dark');

  const toggleColorScheme = () => {
    setForcedColorScheme(prev => {
      if (prev === null) return systemColorScheme === 'dark' ? 'light' : 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
