import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useLazyGetCitiesQuery } from "../../../slices/apiSlice";
import { citiesTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";

export default function Cities() {
  const [getCities, { data }] = useLazyGetCitiesQuery();
  const [page, setPage] = useState(1);

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
    getCities({page});
  }, [page]);

  return (
    <>
      <Table
        data={data?.data}
        settings={citiesTableSettings}
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
