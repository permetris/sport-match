import React from "react";
import Navigation from "./components/Navigation";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Registration } from "./components/Registration";
import { Home } from "./pages/Home/index";
import { ResetPassword } from "./components/ResetPassword/ResetPass";
import { ToastContainer } from "react-toastify";
import { SendEmail } from "./components/ResetPassword/SendEmail";
import { UserHistory } from "./pages/UserHistory";
import { AddResult } from "./components/AddResult/AddResult";
import { Match } from "./components/Match/Match";
import { Login } from "./pages/Login/index";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/Error/NotFound";
import UnhandledPage from "./pages/Error/Unhandled";
import Dashboard from "./pages/Dashboard";
import Unauthorised from "./pages/Error/Unauthorised";
import Cities from "./pages/Dashboard/Cities";
import Reservations from "./pages/Dashboard/Reservations";
import Fields from "./pages/Dashboard/Fields";
import Users from "./pages/Dashboard/Users";
import { UserProfile } from "./pages/UserProfile";

const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet className="h-full" style={{ marginTop: "px" }} />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <UnhandledPage />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "unauthorised",
        element: <Unauthorised />,
      },
      {
        path: "/",
        element: <Home style={{ overflow: "hidden" }} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "reset-password",
        element: <SendEmail />,
      },
      {
        path: "admin/register",
        element: <Registration />,
      },
      {
        path: "reset-password/:id/:emailToken",
        element: <ResetPassword />,
      },
      {
        path: "history",
        element: <UserHistory />,
      },
      {
        path: "match/:id/result",
        element: <AddResult />,
      },
      {
        path: "user/:username",
        element: <UserProfile />,
      },
      {
        path: "match/:id",
        element: <Match />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "cities", element: <Cities /> },
          { path: "reservations", element: <Reservations /> },
          { path: "", element: <Reservations /> },
          { path: "fields", element: <Fields /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
]);

export const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};
