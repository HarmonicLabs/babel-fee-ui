import { Component } from 'solid-js';
import { Button } from '@suid/material';
import Brightness4 from '@suid/icons-material/Brightness4';
import Brightness7 from '@suid/icons-material/Brightness7';

interface ThemeToggleProps {
  themeMode: () => 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}

const ThemeToggle: Component<ThemeToggleProps> = (props) => {
  return (
    <Button
      color="inherit"
      onClick={() => props.setThemeMode(props.themeMode() === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {props.themeMode() === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </Button>
  );
};

export default ThemeToggle;