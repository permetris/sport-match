import React, { useState } from "react";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../../slices/apiSlice";
import { toastError, toastSuccess } from "../../../../hooks/useToastify";

import SelectBox from "../../../../components/SelectBox";

const roles = [
  { id: "USER", role: "User" },
  { id: "ADMIN", role: "Admin" },
  { id: "FIELD_OWNER", role: "Field owner" },
];

export const AddUserModal = ({ setIsAddUser, getUsers, user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [surname, setSurname] = useState(user ? user.surname : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [password, setPassword] = useState(user ? "Hidden" : "");
  const [userData, setUserData] = useState(user ? user : null);
  const [updateUser] = useUpdateUserMutation();

  const [role, setRole] = useState(roles[0]);

  const [addUser] = useCreateUserMutation();

  const handleAddUser = async () => {
    try {
      const result = await addUser({
        name,
        surname,
        username,
        password,
        email,
        phone,
        role: role.id,
      }).unwrap();
      if (result.success) {
        toastSuccess("Added user");
        setIsAddUser(false);
        getUsers({ page: 1 });
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleSaveUser = async () => {
    try {
      const result = await updateUser({
        ...user,
        name,
        surname,
        username,
        password: password === "Hidden" ? user.password : password,
        email,
        phone,
        role: role.id,
      }).unwrap();

      if (result.success) {
        toastSuccess("Successfuly updated user!");
        getUsers({ page: 1 });
        setIsAddUser(false);
        setUserData(null);
        setEmail("");
        setName("");
        setSurname("");
        setPassword("");
        setPhone("");
        setUsername("");
      }
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-1 flex-col w-1/2 justify-center bg-white px-6 py-2 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              {user ? "Edit user" : "Create user"}
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" action="#" method="POST">
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Name:
                </label>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Surname:
                </label>
                <div>
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    value={surname}
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Username:
                </label>
                <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Email:
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Phone:
                </label>
                <div>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-800 "
                >
                  Password:
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <SelectBox
                labelText={"Role"}
                data={roles}
                displayKey={"role"}
                selected={role}
                setSelected={setRole}
              />
              {user ? (
                <div>
                  <button
                    type="button"
                    onClick={handleSaveUser}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleAddUser}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </button>
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => setIsAddUser(false)}
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
