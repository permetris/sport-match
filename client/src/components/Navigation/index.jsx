import React from "react";
import { toastSuccess, toastError } from "../../hooks/useToastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { successMessages } from "../../utils/responseMessages";
import { useAuth } from "../../context/AuthContext";

import { ROLES } from "../../utils/roles";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", roles: [ROLES.ADMIN, ROLES.OWNER] },
  ];
  const onLogoutHandler = () => {
    try {
      logout();
      toastSuccess(successMessages.userLoggedOut);
      navigate("/");
    } catch (err) {
      toastError(err);
    }
  };
  if (
    (user?.role !== ROLES.ADMIN && user?.role !== ROLES.OWNER) ||
    !location.pathname.split("/").includes("dashboard")
  ) {
    return (
      <header className="sticky top-0 bg-gray-800">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">GameFinder</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>
          <div className="lg:flex lg:gap-x-12">
            {user &&
              navigation
                .filter((item) => item.roles.includes(user.role))
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm font-semibold leading-6 text-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-3">
            {!user && (
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className="rounded-md bg-indigo-200 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </Link>
            )}
            {user && (
              <div>
                <span className="font-semibold text-gray-500">
                  <Link
                    className="text-gray-300"
                    to={`/user/${user.username}`}
                  >{`${user.name} ${user.surname}`}</Link>
                </span>
                <button
                  onClick={onLogoutHandler}
                  className="rounded-md ms-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

export default Navigation;
