import React, { useState } from "react";
import {
  useAddCityMutation,
  useUpdateCityMutation,
} from "../../../../slices/apiSlice";
import { toastError, toastSuccess } from "../../../../hooks/useToastify";

export const AddCityModal = ({ setIsAddCity, getCities, city, setCity }) => {
  const [cityName, setCityName] = useState(city ? city.name : "");
  const [updateCity] = useUpdateCityMutation();
  const [addCity] = useAddCityMutation();
  const changeCity = (e) => {
    setCityName(e.target.value);
  };
  const handleAddCity = async () => {
    try {
      const result = await addCity({ name: cityName }).unwrap();
      if (result.success) {
        toastSuccess("Added city");
        setIsAddCity(false);
        getCities({ page: 1 });
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handleSaveCity = async () => {
    try {
      const result = await updateCity({
        _id: city._id,
        name: cityName,
      }).unwrap();
      if (result.success) {
        toastSuccess("Updated city");
        setIsAddCity(false);
        setCity(null);
        await getCities({ page: 1 });
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-1 flex-col w-4 justify-center bg-white px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              Add new city
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-3" action="#" method="POST">
              <div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    required
                    onChange={changeCity}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {city ? (
                <div>
                  <button
                    type="button"
                    onClick={handleSaveCity}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleAddCity}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </form>
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setIsAddCity(false)}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
