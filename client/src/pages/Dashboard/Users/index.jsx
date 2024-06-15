import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useDeleteUserMutation, useLazyGetUsersQuery } from "../../../slices/apiSlice";
import { userTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { toastError, toastSuccess } from "../../../hooks/useToastify";

export default function Users() {
  const [page, setPage] = useState(1);
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers, { data }] = useLazyGetUsersQuery();

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = async (id) => {
    try {
      const result = await deleteUser({ id }).unwrap();
      if (result.success) {
        toastSuccess("User deleted successfully")
        getUsers({ page, isDeleted: false });
      }
    }
    catch (error) { toastError(error)}
    
  };
  const addEntry = () => {
    console.log("adding");
  };
  useEffect(() => {
    getUsers({ page , isDeleted: false});
  }, [page]);

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
    </>
  );
}
