import { Component } from 'solid-js';
import { Container, Grid, Box } from '@suid/material';
import Header from '../components/Header/Header';
import HeroSection from '../components/Template/HeroSection';
import FeatureCardsSection from '../components/Template/FeatureCardsSection';
import StatisticsSection from '../components/Template/StatisticsSection';
import CTAButtonsSection from '../components/Template/CTAButtonsSection';
import HeroBannerSection from '../components/Template/HeroBannerSection';
import TopPerformersSection from '../components/Template/TopPerformersSection';
import AnnouncementBanner from '../components/Template/AnnouncementBanner';
import Footer from '../components/Template/Footer';

interface TemplateProps {
  themeMode: () => 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}

const Template: Component<TemplateProps> = (props) => {
  return (
    <>
      <Header themeMode={props.themeMode} setThemeMode={props.setThemeMode} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AnnouncementBanner />
        <HeroSection />
        <FeatureCardsSection />
        <StatisticsSection />
        <CTAButtonsSection />
        <HeroBannerSection />
        <TopPerformersSection />
        <Footer />
      </Box>
    </>
  );
};

export default Template;