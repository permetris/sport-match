import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import {
  useDeleteUserMutation,
  useLazyGetUsersQuery,
} from "../../../slices/apiSlice";
import { userTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { toastError, toastSuccess } from "../../../hooks/useToastify";
import { AddUserModal } from "./AddUser";

export default function Users() {
  const [page, setPage] = useState(1);
  const [isAddUser, setIsAddUser] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers, { data }] = useLazyGetUsersQuery();
  const [editUser, setEditUser] = useState(null)

  const editEntry = (id) => {
    setIsAddUser(true);
    setEditUser(data.data.find((each) => each._id === id))
  };
  const deleteEntry = async (id) => {
    try {
      const result = await deleteUser({ id }).unwrap();
      if (result.success) {
        toastSuccess("User deleted successfully");
        getUsers({ page, isDeleted: false });
      }
    } catch (error) {
      toastError(error);
    }
  };
  const addEntry = () => {
    setIsAddUser(true);
  };
  useEffect(() => {
    getUsers({ page, isDeleted: false });
  }, [page]);
console.log(data)
  return (
    <>
      <Table
        data={data?.data}
        settings={userTableSettings}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
        addEntry={addEntry}
      />
      <Pagination
        totalItems={data?.totalItems}
        page={page}
        setPage={setPage}
      ></Pagination>
      {isAddUser && (
        <AddUserModal
          setIsAddUser={setIsAddUser}
          getUsers={getUsers}
          user={editUser}
        ></AddUserModal>
      )}
    </>
  );
}
