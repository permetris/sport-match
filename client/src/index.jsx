import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import store from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App className='h-full bg-sky-400' />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
