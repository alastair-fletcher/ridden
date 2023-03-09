import React from 'react';
import ReactDOM from 'react-dom/client';
import { BikesProvider } from './context/BikeContext';
import { AuthProvider } from './context/AuthContext';
import { UsersProvider } from './context/UserContext';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BikesProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </BikesProvider>
    </AuthProvider>
  </React.StrictMode>
);
