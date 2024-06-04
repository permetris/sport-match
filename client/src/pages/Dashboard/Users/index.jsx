import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useLazyGetUsersQuery } from "../../../slices/apiSlice";
import { userTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";

export default function Users() {
  const [page, setPage] = useState(1);
  const [getUsers, { data }] = useLazyGetUsersQuery();

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = (id) => {
    console.log("deleting" + id);
  };
  const addEntry = () => {
    console.log("adding");
  };
  useEffect(() => {
    getUsers({ page });
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
