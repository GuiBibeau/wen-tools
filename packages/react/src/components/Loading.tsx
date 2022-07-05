import React from "react";

export const Loading = () => {
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-2 border-blue-400 border-solid rounded-full animate-spinner"
      />
    </div>
  );
};
