import React, { useState } from "react";
import { useUpdateUserMutation } from "../../../slices/apiSlice";
import { toastError, toastSuccess } from "../../../hooks/useToastify";

export default function UserInfo({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);

  const [update] = useUpdateUserMutation();

  const updateUser = async (e) => {
    e.preventDefault();
    setIsEdit(false);

    try {
      const result = await update({
        ...user,
        username,
        name,
        surname,
        email,
      }).unwrap();
      if (result.success) {
        toastSuccess("Successfully updated user.");
      }
    } catch (error) {
      toastError(error);
      setUsername(user.username);
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
    }
  };

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-4 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <form className="md:col-span-2" onSubmit={updateUser}>
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:max-w-xl sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-white"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEdit}
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-white"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                disabled={!isEdit}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                disabled={!isEdit}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  disabled={!isEdit}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6 p-2"
                  placeholder="janesmith"
                />
              </div>
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="mt-2 flex">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        )}
        {!isEdit && (
          <div className="mt-2 flex">
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              Edit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
