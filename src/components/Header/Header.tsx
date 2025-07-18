import { Component } from "solid-js";
import { AppBar, Toolbar, Typography, Button, Box } from "@suid/material";
import { A } from "@solidjs/router";
import { CardanoWalletConnect } from "../CardanoWalletConnect/CardanoWalletConnect";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  themeMode: () => "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Babel Providers Demo
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
			<Button color="inherit" component={A} href="/">
				Home
			</Button>	
			<CardanoWalletConnect />
			<ThemeToggle
				themeMode={props.themeMode}
				setThemeMode={props.setThemeMode}
			/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
