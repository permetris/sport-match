import React, { useState } from "react";
import { useUpdatePasswordMutation } from "../../../api/slice";
import { useAuth } from "../../../context/AuthContext";
import { toastSuccess, toastWarning } from "../../../hooks/useToastify";

export const UpdatePassword = () => {
  const [updateTrigger] = useUpdatePasswordMutation();
  const { user, logout } = useAuth();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (e) => {
    console.log(passwords);
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (passwords.newPassword === passwords.confirmPassword) {
      const result = await updateTrigger(user._id, passwords, user.token);
      console.log(result);
      toastSuccess("Successfully updated passwords!");
    } else {
      toastWarning("Passwords do not match!");
    }
  };
  console.log(user);
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium leading-6 text-white"
            >
              Current password
            </label>
            <div className="mt-2">
              <input
                onChange={inputChangeHandler}
                id="currentPassword"
                name="currentPassword"
                value={passwords.currentPassword}
                type="password"
                autoComplete="currentPassword"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-white"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                onChange={inputChangeHandler}
                id="newPassword"
                value={passwords.newPassowrd}
                name="newPassword"
                type="password"
                autoComplete="newPassword"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-white"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                onChange={inputChangeHandler}
                id="confirmPassword"
                value={passwords.confirmPassword}
                name="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="button"
            onClick={updatePasswordHandler}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
