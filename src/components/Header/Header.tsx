import { Component } from "solid-js";
import { AppBar, Toolbar, Typography, Button, Box, styled } from "@suid/material";
import { A } from "@solidjs/router";
import { CardanoWalletConnect } from "../CardanoWalletConnect/CardanoWalletConnect";
import ThemeToggle from "./ThemeToggle";
import HeaderButtons from "./HeaderButtons";
interface HeaderProps {
  themeMode: () => "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
}

const HeroText = styled('h1')({
  fontFamily: '"Bitcount Prop Single", sans-serif',
  fontWeight: 700,
  fontSize: '26px',
  color: '#FF0000', // Muted gold
  background: 'linear-gradient(to right, #4A4063, #D4A017)', // Purple to gold gradient
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  padding: '20px',
});

const Header: Component<HeaderProps> = (props) => {
  return (
    <AppBar position="static" color="default" sx={{ height: '8%', width: "100%"}}>
        <Toolbar sx={{ width: '90%'}} >
            <Typography sx={{ flexGrow: 1 }}>
              <HeroText>Babel Fees by Harmonic Labs</HeroText>
            </Typography>
            <HeaderButtons />
            <Box sx={{ display: "flex", gap: "10px" }}>
                <Button variant="text" color="primary" component={A} href="/">
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
