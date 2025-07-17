import { Card, CardContent, CardActions, Button, Typography } from "@suid/material";
import { Component } from "solid-js";

const HomeCard3: Component = () => {
  return (
    <Card sx={{ height: "100%", width: "100%", boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}>
      <CardContent>
        <Typography variant="h5" component="div">
        HomeCard3
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start building Cardano Dapps Today
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard3;
