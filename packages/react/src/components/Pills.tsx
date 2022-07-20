import React from "react";

export const ConnectedPill = () => {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      Connected
    </span>
  );
};

export const NotConnectedPill = () => {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone-200 text-stone-900">
      Not Connected
    </span>
  );
};

export const LoadingPill = () => {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-sky-500 text-sky-100">
      <p className="mr-2">Loading</p>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-3 h-3 border-2 border-sky-100 border-solid rounded-full animate-spinner"
      />
    </span>
  );
};
