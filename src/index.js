import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { MantineProvider } from '@mantine/core';;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider> {/* MantineProvider should be the outermost component */}
    <React.StrictMode> {/* React.StrictMode should be inside MantineProvider */}
      <App />
    </React.StrictMode>
  </MantineProvider>
);


