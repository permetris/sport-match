import React from "react";

export default function Table({
  data,
  settings,
  addEntry,
  deleteEntry,
  editEntry,
}) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="mt-4 sm:mt-0 ">
                <button
                  type="button"
                  onClick={addEntry}
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {`Add ${settings.name}`}
                  
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        {settings?.fields.map((each) => (
                          <th
                            key={each.key}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            {each.displayName}
                          </th>
                        ))}
                        {settings.deepFields && settings.deepFields.map((each) => (
                          <th
                            key={each.displayName}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            {each.displayName}
                          </th>
                        ))}

                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-white text-right"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {data?.map((each) => (
                        <tr key={each._id}>
                          {settings.fields.map((field) => (
                            <td
                              key={each[field.key]}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                            >
                              {field.key !== "time" ? each[field.key] : new Date(each[field.key]).toUTCString()}

                            </td>
                          ))}
                          {settings.deepFields && settings.deepFields.map((field) => (
                            <td
                              key={each[field.firstKey]}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                            >
                              {each[field.firstKey][field.secondKey]}
                            </td>
                          ))}

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() => editEntry(each._id)}
                              className="text-indigo-400 hover:text-indigo-300 me-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEntry(each._id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
