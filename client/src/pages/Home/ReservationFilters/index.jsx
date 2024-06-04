import React from "react";
import { useGetCitiesQuery } from "../../../slices/apiSlice";

export const ReservationFilters = ({
  setDateFilter,
  setCityFilter,
  resetFilters,
}) => {
  const { data: cities, isLoading } = useGetCitiesQuery();
  const onSelectCity = (e) => {
    setCityFilter(e.target.value);
  };
  const onSelectDate = (e) => {
    setDateFilter(new Date(e.target.value).toISOString());
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="w-1/3">
        <label
          htmlFor="city"
          className="block text-sm font-medium leading-6 text-sky-300"
        >
          Select city
        </label>
        <select
          id="city"
          name="city"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue=""
          onChange={onSelectCity}
        >
          <option value={""}>All cities</option>
          {cities?.data.map((city) => (
            <option key={city._id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3">
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-sky-300"
        >
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={onSelectDate}
        ></input>
      </div>
      <button
        onClick={resetFilters}
        type="button"
        className="rounded bg-transparent px-2 py-1 mt-6 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
      >
        Reset Filter
      </button>
    </div>
  );
};
