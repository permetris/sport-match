import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { useAuth } from "../../context/AuthContext";

export const UserProfile = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const secondaryNavigation = [
    { name: "Account", href: (id) => `/user/${id}` },
    { name: "History", href: (id) => `/user/${id}/history` },
  ];
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  },[])
  
  return (
    <Container>
      <header className="border-b border-white/5">
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
          >
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href(user?.username)}
                  className={"text-indigo-400"}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </Container>
  );
};
