import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { toastError, toastSuccess } from "../../hooks/useToastify";
import { useResetPasswordWithTokenMutation } from "../../slices/apiSlice";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const emailToken = pathname.split("/")[3];
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [resetPassword] = useResetPasswordWithTokenMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await resetPassword({
        id,
        emailToken,
        password,
        repeatPassword,
      }).unwrap();
      if (result.success) {
        navigate("/login");
        toastSuccess("Successfully reset password");
      }
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              New password:
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="repeatPassword"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Confirm password:
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setRepeatPassword(e.target.value)}
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                value={repeatPassword}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
