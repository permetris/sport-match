import React from "react";

export default function Container({ children }) {
  return (
    <div className="overflow-hidden rounded-lg w-screen overflow-hidden">
      <div className="mx-auto flex-row max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
