import React from "react";
import Navigation from "./components/Navigation";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Registration } from "./components/Registration";
import { Home } from "./pages/Home/index";
import { UserProfilee } from "./components/asd/UserProfile";
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
        path: "user/:username",
        element: <UserProfilee />,
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
        path: "match/:id",
        element: <Match />,
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
