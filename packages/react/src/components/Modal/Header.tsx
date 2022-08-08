import React from "react";
import { LoadingPill, NotConnectedPill, ConnectedPill } from "../Pills";
import { useWen, disconnect } from "@wen-tools/actions";
import { getShortenedAddress } from "../../helpers";
import { useTheme } from "../ButtonProvider";

export const ModalHeader = () => {
  const { requesting, connected, address } = useWen();
  const { button, header, text } = useTheme();

  const handleClick = () => {
    disconnect();
  };
  return (
    <div className="pb-5 ">
      <div className="flex justify-between items-baseline">
        <div className="sm:w-0 sm:flex-1">
          <h1 id="message-heading" className={header}>
            {window.location.hostname}
          </h1>
          {address ? (
            <>
              <p className={text}>
                Connected with
                {` ${getShortenedAddress(address)}`}
              </p>
              <button type="button" className={button} onClick={handleClick}>
                Disconnect
              </button>
            </>
          ) : (
            <p className={text}>Connect your wallet to use this app.</p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          {requesting && <LoadingPill />}
          {!(requesting || connected) && <NotConnectedPill />}
          {!requesting && connected && <ConnectedPill />}
        </div>
      </div>
    </div>
  );
};
