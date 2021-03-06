import React from "react";
import { LoadingPill, NotConnectedPill, ConnectedPill } from "../Pills";
import { useWen, disconnect } from "wen-actions";
import { getShortenedAddress } from "../../helpers";

export const ModalHeader = () => {
  const { requesting, connected, address } = useWen();
  const handleClick = () => {
    disconnect();
  };
  return (
    <div className="pb-5 ">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900"
          >
            {window.location.hostname}
          </h1>
          {address ? (
            <>
              <p className="mt-1 text-sm text-gray-500 truncate">
                Connected with {getShortenedAddress(address)}
              </p>
              <button
                type="button"
                className="inline-flex justify-center rounded-md px-4 py-2 mt-4 text-base font-medium  sm:text-sm border-gray-300 border"
                onClick={handleClick}
              >
                Disconnect
              </button>
            </>
          ) : (
            <p className="mt-1 text-sm text-gray-500 truncate">
              Connect your wallet to use this app.
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          {requesting && <LoadingPill />}
          {!requesting && !connected && <NotConnectedPill />}
          {!requesting && connected && <ConnectedPill />}
        </div>
      </div>
    </div>
  );
};
