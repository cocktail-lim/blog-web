import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider></Provider> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
