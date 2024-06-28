export const fieldTableSettings = {
  name: "Field",
  fields: [
    { key: "name", displayName: "Name" },
    { key: "maxPlayers", displayName: "Capacity" },
    { key: "address", displayName: "Address" },
  ],
  deepFields: [{ firstKey: "city", secondKey: "name", displayName: "City" }],
};
