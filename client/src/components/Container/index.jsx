import React from "react";

export default function Container({ children }) {
  return (
    <div className="overflow-hidden rounded-lg h-full overflow-hidden">
      <div className="mx-auto flex-row max-w-7xl items-center h-full justify-between gap-x-6 p-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
