import React, { useEffect, useState, type FC } from "react";
import { getShortenedAddress } from "../helpers";
import { useAddress, useWallet, useWenState } from "../store";

type Props = {
  onClick: VoidFunction;
};

export const Button: FC<Props> = ({ onClick }) => {
  const { address } = useWallet();
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLabel(address ? getShortenedAddress(address) : "Connect Wallet");
    }, 300);
  }, [address]);

  if (!label) {
    return (
      <button className="items-center w-44 h-12 flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200">
        <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
          <div className="w-24 bg-gray-300 h-4 rounded-md " />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="items-center w-44 h-12 flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200"
    >
      {label}
    </button>
  );
};
