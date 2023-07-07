import React from 'react';
import { Navigation } from './components/nav/Navigation';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { Home } from './components/home/Home';
import { UserProfile } from './components/user/UserProfile';
import { ResetPassword } from './components/reset-password/ResetPass';
import { ToastContainer } from 'react-toastify';
import { SendEmail } from './components/reset-password/SendEmail';
import { UserHistory } from './components/user/UserHistory/UserHistory';
import { AddResult } from './components/add-result/AddResult';
import { Match } from './components/match/Match';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { ReservationDetails } from './components/reservation/ReservationDetails';

const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
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
        element: <Home/>
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
        path: 'reservation/:id',
        element: <ReservationDetails />
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
