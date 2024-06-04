import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useLazyGetFieldsQuery } from "../../../slices/apiSlice";
import { fieldTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";

export default function Fields() {
  const [page, setPage] = useState(1);
  const [getFields,{ data }] = useLazyGetFieldsQuery();

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
    getFields({ page });
  }, [page]);
  return (
    <>
      <Table
        data={data?.data}
        settings={fieldTableSettings}
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
