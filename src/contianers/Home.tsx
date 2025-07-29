import { Component } from 'solid-js';
import {  Box } from '@suid/material';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import ProviderCardsSection from '../components/ProviderCardsSection/ProviderCardsSection';
import Footer from '../components/Footer/Footer';

interface HomeProps {
  themeMode: () => 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}

const Home: Component<HomeProps> = (props) => {
  return (
    <>
      <Header themeMode={props.themeMode} setThemeMode={props.setThemeMode} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeroSection />
        <Footer />
      </Box>
    </>
  );
};

export default Home;