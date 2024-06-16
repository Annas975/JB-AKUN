/**
 * Mengimpor dan merender komponen utama aplikasi menggunakan ReactDOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Merender aplikasi di dalam elemen 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);