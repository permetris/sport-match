import React, { useEffect, useState } from "react";
import {
  useAddReservationMutation,
  useGetFieldsQuery,
} from "../../../../slices/apiSlice";
import { toastError, toastSuccess } from "../../../../hooks/useToastify";
import SelectBox from "../../../../components/SelectBox";
import Toggle from "../../../../components/Toogle";
import { getTomorrowDate } from "../../../../utils/getTomorrowDate";
import { useAuth } from "../../../../context/AuthContext";

export const AddReservationModal = ({
  setIsAddReservation,
  getReservations,
}) => {
  const { user } = useAuth(); 
  const [dateTime, setDateTime] = useState("");
  const [isAllRandom, setIsAllRandom] = useState();
  const { data: fields, isSuccess } = useGetFieldsQuery({
    page: 1,
    size: 100,
    isDeleted: false,
    owner: user?.role === "FIELD_OWNER" ? user._id : undefined
  });
  const [selectedField, setSelectedField] = useState(null);
  const [addReservation] = useAddReservationMutation();
  const changeDateTime = (e) => {
    setDateTime(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedField(fields.data[0]);
    }
  },[isSuccess]);
  const handleAddReservation = async () => {
    try {
      const result = await addReservation({
        time: new Date(dateTime).toISOString(),
        field: selectedField,
        openEntry: !isAllRandom,
      }).unwrap();
      if (result.success) {
        toastSuccess("Added reservation");
        setIsAddReservation(false);
        await getReservations({ page: 1 });
      }
    } catch (error) {
      toastError(error);
    }
  };
  if (!isSuccess) { 
    return <h1>Loading</h1>
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-1 flex-col w-1/2 justify-center bg-white px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              Add new reservation
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Time:
                </label>
                <div className="mt-2">
                  <input
                    id="time"
                    name="time"
                    type="datetime-local"
                    value={dateTime}
                    min={getTomorrowDate()}
                    required
                    onChange={changeDateTime}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {isSuccess && (
                <SelectBox
                  data={fields?.data}
                  selected={selectedField}
                  setSelected={setSelectedField}
                  displayKey={"name"}
                  labelText={"Field:"}
                />
              )}
              <Toggle
                enabled={isAllRandom}
                setEnabled={setIsAllRandom}
                title={"All random"}
                description={"Reservation type is Free Entry by default"}
              ></Toggle>
              <div>
                <button
                  type="button"
                  onClick={handleAddReservation}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsAddReservation(false)}
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
