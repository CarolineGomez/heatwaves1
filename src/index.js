import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the /client import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
