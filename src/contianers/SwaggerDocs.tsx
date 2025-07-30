import { Component } from 'solid-js';
import { Box } from '@suid/material';
import Header from '../components/Header/Header';
import SwaggerDocsComponent from '../components/Openapi/SwaggerDocsComponent';
import Footer from '../components/Footer/Footer';

interface SwaggerDocsProps {
  themeMode: () => 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}

const SwaggerDocs: Component<SwaggerDocsProps> = (props) => {
  return (
    <>
      <Header themeMode={props.themeMode} setThemeMode={props.setThemeMode} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SwaggerDocsComponent themeMode={props.themeMode}/>
        <Box sx={{ flexShrink: 0, zIndex: 1 }}> {/* Ensure footer stays at bottom */}
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default SwaggerDocs;