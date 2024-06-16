import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import {
  useDeleteFieldMutation,
  useLazyGetFieldsQuery,
} from "../../../slices/apiSlice";
import { fieldTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { toastError, toastSuccess } from "../../../hooks/useToastify";

export default function Fields() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [getFields, { data }] = useLazyGetFieldsQuery();
  const [deleteField] = useDeleteFieldMutation();

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = async (id) => {
    try {
      const result = await deleteField({ id }).unwrap();
      if (result.success) {
        toastSuccess("Successfully deleted city.");
        getFields({ page, size, isDeleted:false });
      }
    } catch (error) {
      toastError(error);
    }
  };
  const addEntry = () => {
    console.log("adding");
  };
  useEffect(() => {
    getFields({ page, size: 0, isDeleted:false });
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
