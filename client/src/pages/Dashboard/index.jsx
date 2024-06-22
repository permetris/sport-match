import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { navigation } from "./Sidebars/Utils/constants";
import { classNames } from "../../utils/classNames";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === ROLES.USER || !user) {
      navigate("/unauthorised");
    }
  }, [user]);

  return (
    <>
      <div className="xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold z-",
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="xl:pl-72">
        <Outlet />
      </div>
    </>
  );
}
