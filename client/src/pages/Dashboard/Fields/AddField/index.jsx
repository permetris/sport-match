import React, { useState, useEffect } from "react";
import {
  useAddFieldMutation,
  useGetCitiesQuery,
  useLazyGetUsersQuery,
} from "../../../../slices/apiSlice";
import { toastError, toastSuccess } from "../../../../hooks/useToastify";
import SelectBox from "../../../../components/SelectBox";
import SearchBox from "../../../../components/SearchBox";
import { useAuth } from "../../../../context/AuthContext";
import { ROLES } from "../../../../utils/roles";
import Toggle from "../../../../components/Toogle";

export const AddFieldModal = ({ setIsAddField, getFields }) => {
  const { user } = useAuth();
  const { data: cities, isSuccess: citiesSuccess } = useGetCitiesQuery();
  const [getUsers, { data: users }] = useLazyGetUsersQuery();
  const [addField] = useAddFieldMutation();
  const [fieldName, setFieldName] = useState("");
  const [fieldAddress, setFieldAddress] = useState("");
  const [capacity, setCapacity] = useState({ _id: 22, value: 22 });
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState("null");
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "name") {
      setFieldName(e.target.value);
    }
    if (name === "address") {
      setFieldAddress(e.target.value);
    }
  };
  useEffect(() => {
    if (citiesSuccess) setSelectedCity(cities.data[0]);
  }, [citiesSuccess]);
  const handleAddField = async (e) => {
    e.preventDefault();
    const newField = {
      name: fieldName,
      address: fieldAddress,
      maxPlayers: capacity.value,
      owner: selectedPerson ? selectedPerson._id : user._id,
      city: selectedCity,
      isOutdoor,
    };

    try {
      const result = await addField(newField).unwrap();
      if (result.success) {
        toastSuccess("Added field");
        setIsAddField(false);
        getFields({ page: 1, size: 10, isDeleted: false, owner: user.role === "FIELD_OWNER" ? user._id: undefined });
      }
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    if (user?.role === ROLES.ADMIN) {
      getUsers({
        isDeleted: false,
        username: query,
        page: 1,
        role: ROLES.OWNER,
      });
    }
  }, [query]);
  if (!citiesSuccess) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-1 flex-col w-1/2 justify-center bg-white px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              Add new field
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-1" onSubmit={handleAddField} method="POST">
              <div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Field name: "
                    value={fieldName}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Field Address: "
                    value={fieldAddress}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {citiesSuccess && (
                <SelectBox
                  labelText={"Select city:"}
                  data={cities?.data}
                  displayKey={"name"}
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                />
              )}
              {user?.role === ROLES.ADMIN && (
                <SearchBox
                  data={users?.data}
                  selectedItem={selectedPerson}
                  setSelectedItem={setSelectedPerson}
                  query={query}
                  setQuery={setQuery}
                  displayKey={"username"}
                  title={"Owner:"}
                />
              )}
              <SelectBox
                labelText={"Capacity:"}
                data={[
                  { _id: 22, value: 22 },
                  { _id: 20, value: 20 },
                  { _id: 18, value: 18 },
                  { _id: 16, value: 16 },
                  { _id: 14, value: 14 },
                  { _id: 12, value: 12 },
                  { _id: 10, value: 10 },
                ]}
                displayKey={"value"}
                selected={capacity}
                setSelected={setCapacity}
              />
              <div className="mt-3">
                <Toggle
                  enabled={isOutdoor}
                  setEnabled={setIsOutdoor}
                  title={"Outdoor field?"}
                  description={""}
                />
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
              </div>
            </form>
            <div>
              <button
                type="button"
                onClick={() => setIsAddField(false)}
                className="flex w-full justify-center rounded-md mt-2 bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
