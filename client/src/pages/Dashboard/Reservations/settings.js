export const reservationTableSettings = {
  name: "Reservation",
  fields: [{ key: "num", displayName: "Id" },{ key: "time", displayName: "Time" },{ key: "status", displayName: "Status" }],
  deepFields: [{ firstKey: "field", secondKey: "name", displayName: "Field Name" },
    // { firstKey: "field.city", secondKey: "name", displayName: "City name" },
  ],
  triple: [{ firstKey: "field", secondKey: "city",thirdKey: "name", displayName: "City Name" }]
};
