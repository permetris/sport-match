import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import {
  useDeleteCityMutation,
  useLazyGetCitiesQuery,
} from "../../../slices/apiSlice";
import { citiesTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { toastSuccess } from "../../../hooks/useToastify";
import { AddCityModal } from "./AddCity";

export default function Cities() {
  const [getCities, { data, isLoading, isFetching }] = useLazyGetCitiesQuery();
  const [deleteCity] = useDeleteCityMutation();
  const [page, setPage] = useState(1);
  const [isAddCity, setIsAddCity] = useState(false);
  const [updateCity, setUpdateCity] = useState(null);

  const editEntry = async (id) => {
    setIsAddCity(true);
    setUpdateCity(data.data.find((each) => each._id === id));
  };
  const deleteEntry = async (id) => {
    const deleteResult = await deleteCity({ id }).unwrap();
    if (deleteResult.success) {
      toastSuccess("Sucessfully deleted city.");
      await getCities({ page });
    }
  };
  const addEntry = () => {
    setIsAddCity(true);
  };

  useEffect(() => {
    getCities({ page });
  }, [page]);

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

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
      {isAddCity && (
        <AddCityModal
          setIsAddCity={setIsAddCity}
          getCities={getCities}
          city={updateCity}
        />
      )}
    </>
  );
}
