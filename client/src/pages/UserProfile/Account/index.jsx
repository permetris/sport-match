import React from "react";
import UserInfo from "../UserInfo";
import { UpdatePassword } from "../UpdatePassword";
import { useNavigate, useParams } from "react-router-dom";


import { toastError, toastSuccess } from "../../../hooks/useToastify";
import { useDeleteUserMutation, useGetUserQuery } from "../../../slices/apiSlice";
import { useAuth } from "../../../context/AuthContext";

export function Account() {
  const { user, logout } = useAuth();
  const [deleteUser] = useDeleteUserMutation();
  const { username } = useParams();
  const { data, isLoading } = useGetUserQuery(username);
  const navigate = useNavigate();

  const deleteProfile = async () => {
    try {
      const result = await deleteUser(user).unwrap();
      if (result.success) {
        toastSuccess("User deleted");
        setTimeout(() => logout(), 1500);
        navigate("/");
      }
    } catch (error) {
      toastError(error);
    }
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (username !== user?.username) {
    return "You can only access this users history";
  }
  return (
    <>
      <UserInfo user={data?.data} />
      <UpdatePassword />
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Delete account
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <form className="flex items-start md:col-span-2">
          <button
            type="button"
            onClick={deleteProfile}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
          >
            Yes, delete my account
          </button>
        </form>
      </div>
    </>
  );
}
