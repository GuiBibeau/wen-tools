import React, { type FC } from "react";
import { Notification } from "./Notification";
import { Loading } from "./Loading";
import { chains } from "../chains";

import { useWallet, useWenState, wallet } from "../store";
import { transitions } from "../transitions";
import { NetworkStatus } from "./NetworkStatus";
import { hexaToEth } from "../helpers";

type Props = {
  chainId: ChainId;
  handleClose: VoidFunction;
};

export const ConnectMetamaskPanel: FC<Props> = ({ chainId, handleClose }) => {
  const state = useWenState();
  const store = useWallet();

  const chainName = chains[chainId].name;
  const hostName = window.location.hostname;

  const handleConnect = () => {
    transitions.clickConnect({
      entryState: "not-connected",
      exitState: "connecting",
    });
  };

  const handleDisconnect = () => {
    transitions.userDisconnects({
      entryState: "ready-for-dapp",
      exitState: "not-connected",
    });
  };

  const handleChangeNetwork = () => {
    transitions.clickChangeNetwork({
      entryState: "wrong-network",
      exitState: "changing-network",
    });
  };

  const showConnectButton = state === "not-connected" || state === "connecting";

  const showDisconnectButton = state === "ready-for-dapp";

  const showChangeNetworkbutton =
    state === "wrong-network" || state === "changing-network";

  return (
    <div>
      <div className="pb-1 sm:pb-6">
        <div className="mt-6 sm:mt-8 sm:flex sm:items-end">
          <div className="sm:flex-1">
            <div>
              <div className="flex items-center mb-2 justify-center">
                <span className="inline-block relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
                    alt=""
                  />
                </span>
              </div>
              <span className="mt-1 text-gray-900 flex justify-center">
                <p className="flex items-center">
                  <svg
                    className="mr-1"
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.38889 3C1.38889 1.34315 2.73203 0 4.38889 0H4.61111C6.26797 0 7.61111 1.34315 7.61111 3V4H7.5C8.05228 4 8.5 4.44772 8.5 5V9C8.5 9.55228 8.05228 10 7.5 10H1.5C0.947715 10 0.5 9.55228 0.5 9V5C0.5 4.44772 0.947715 4 1.5 4H1.38889V3ZM2.5 4H6.5V3C6.5 1.89543 5.60457 1 4.5 1C3.39543 1 2.5 1.89543 2.5 3V4Z"
                      fill="#242629"
                    />
                  </svg>
                  {hostName}
                </p>
              </span>
              <span className="text-gray-900 flex justify-center">
                <NetworkStatus chainId={chainId} />
              </span>
            </div>
            <div className="flex items-center mb-4 justify-center mt-2">
              {showConnectButton && (
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Connect to your Metamask Wallet
                </h3>
              )}
              {showDisconnectButton && (
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {`${hexaToEth(store.balance!).toString()} ${
                    chains[chainId].symbol
                  }`}
                </h3>
              )}
            </div>
            {showConnectButton && (
              <span className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <p className="text-center">
                  By connecting to {hostName}, you will share your public wallet
                  information and be asked to connect Metamask to the{" "}
                  {chainName} Network.
                </p>
              </span>
            )}
            {showDisconnectButton && (
              <span className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <p className="text-center">
                  You are now connected to {hostName} via the {chainName}{" "}
                  network
                </p>
              </span>
            )}

            <div className="my-5 flex justify-center flex-wrap space-x-3">
              {showConnectButton && (
                <button
                  onClick={handleConnect}
                  className="inline-flex items-center  px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200"
                >
                  Request Connection
                </button>
              )}
              {showDisconnectButton && (
                <button
                  onClick={handleDisconnect}
                  className="inline-flex items-center  px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200"
                >
                  Disconnect
                </button>
              )}
              {showChangeNetworkbutton && (
                <button
                  onClick={handleChangeNetwork}
                  className="inline-flex items-center  px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200"
                >
                  Change Network
                </button>
              )}
            </div>
            {state === "connecting" && (
              <Notification
                title="Requesting Wallet Connection"
                subtitle="Please check the Metamask Extension"
                icon={<Loading />}
              />
            )}
            {state === "changing-network" && (
              <Notification
                title="Requesting Network Connection"
                subtitle="Please check the Metamask Extension"
                icon={<Loading />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
