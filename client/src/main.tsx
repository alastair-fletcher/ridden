import React from 'react';
import ReactDOM from 'react-dom/client';
import { BikesProvider } from './context/BikeContext';
import { AuthProvider } from './context/AuthContext';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BikesProvider>
        <App />
      </BikesProvider>
    </AuthProvider>
  </React.StrictMode>
);
