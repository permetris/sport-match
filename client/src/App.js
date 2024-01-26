import React from 'react';
import Navigation from './components/Navigation';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Home } from './pages/Home';
import { UserProfile } from './components/user/UserProfile';
import { ResetPassword } from './components/ResetPassword/ResetPass';
import { ToastContainer } from 'react-toastify';
import { SendEmail } from './components/ResetPassword/SendEmail';
import { UserHistory } from './components/user/UserHistory/UserHistory';
import { AddResult } from './components/AddResult/AddResult';
import { Match } from './components/Match/Match';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet style={{ marginTop: 'px' }}/>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        path: '/',
        element: <Home style={ { overflow: 'hidden' } } />
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Registration/>
      },
      {
        path: 'forgotten-password',
        element: <SendEmail/>
      },
      {
        path: 'admin/register',
        element: <Registration/>
      },
      {
        path: 'reset-password/:id/:emailToken',
        element: <ResetPassword/>
      },
      {
        path: 'user',
        element: <UserProfile />
      },
      {
        path: 'history',
        element: <UserHistory />
      },
      {
        path: 'match/:id/result',
        element: <AddResult />
      },
      {
        path: 'match/:id',
        element: <Match />
      }
    ]
  }
]);

export const App = () => {
  return (<><RouterProvider router={router} />
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light' />
  </>

  );
};
