import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

