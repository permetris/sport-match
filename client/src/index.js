import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
