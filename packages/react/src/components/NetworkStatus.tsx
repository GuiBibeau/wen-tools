import React, { type FC } from "react";
import { chains } from "../chains";
import { useWallet } from "../store";

type Props = {
  chainId: ChainId;
};

export const NetworkStatus: FC<Props> = ({ chainId }) => {
  const chainName = chains[chainId].name;
  const store = useWallet();

  const rightChain = store.desiredChainId === store.chainId;

  return (
    <p className="flex items-center text-xs">
      {rightChain ? (
        <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400 mr-1">
          <span className="sr-only">Online</span>
        </span>
      ) : (
        <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-gray-400 mr-1">
          <span className="sr-only">not connected</span>
        </span>
      )}

      {chainName}
    </p>
  );
};
