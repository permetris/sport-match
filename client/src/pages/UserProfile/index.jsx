import React from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../slices/apiSlice";
import { useParams } from "react-router-dom";

import Container from "../../components/Container";
import { UpdatePassword } from "./UpdatePassword";
import { useAuth } from "../../context/AuthContext";
import UserInfo from "./UserInfo";

export const UserProfile = () => {
  const { username } = useParams();
  const { data, isLoading } = useGetUserQuery(username);
  const { user: authUser } = useAuth();

  const secondaryNavigation = [
    { name: "Account", href: "#", current: true },
    { name: "History", href: "#", current: false },
  ];

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  

  return (
    <Container>
      <header className="border-b border-white/5">
        {/* Secondary navigation */}
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
          >
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={item.current ? "text-indigo-400" : ""}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="divide-y divide-white/5">
        <UserInfo user={data.data} />
        <UpdatePassword />

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Delete account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>

          <form className="flex items-start md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Yes, delete my account
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};
