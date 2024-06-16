
import React, { useState} from 'react';
import { useAddCityMutation } from '../../../../slices/apiSlice';
import { toastError, toastSuccess } from '../../../../hooks/useToastify';

export const AddCityModal = ({ setIsAddCity, getCities }) => { 
    const [city, setCityName] = useState("");
    const [addCity] = useAddCityMutation();
    const changeCity = (e) => { 
        setCityName(e.target.value);
    }
    const handleAddCity = async () => { 
        try {
            const result = await addCity({ name: city }).unwrap();
            if (result.success) { 
                toastSuccess("Added city");
                setIsAddCity(false);
                getCities({page:1})
            }
        }
        catch (error) { 
            toastError(error);
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-1 flex-col w-1/2 justify-center bg-white px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              Add new city
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800 ">
                 Name:
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={ city}
                                        required
                                        onChange={changeCity}
                    className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                                    type="button"
                                        onClick={handleAddCity}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
                            </div>
                            <div>
                <button
                                    type="button"
                                  onClick={() => setIsAddCity(false)}  
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
                </div>
                </div>
      </>)
}