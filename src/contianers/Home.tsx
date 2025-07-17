import { Component } from "solid-js";
import { Typography, Container, Grid } from "@suid/material";
import Header from "../components/Header/Header";
import Providers from "../components/Providers/Providers";
interface HomeProps {
  themeMode: () => "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
}

const Home: Component<HomeProps> = (props) => {
  return (
    <>
      <Header themeMode={props.themeMode} setThemeMode={props.setThemeMode} />
      <Container sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Select which provider you want to use to pay Babel fees with.
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: "20px" }}>
          <Providers />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
