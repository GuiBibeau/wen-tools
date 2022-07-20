import React, { useEffect } from "react";
import { Button } from "./Button";
import { listen, stopListening } from "wen-actions";
import { detectMetamask } from "../helpers";
import Modal from "./Modal/Container";

type Props = {
  chainId: number;
  chainDisplayName: string;
};

const ChainContext = React.createContext<Props>({
  chainId: 1,
  chainDisplayName: "Ethereum",
});

export const ConnectButton = (props: Props) => {
  useEffect(() => {
    if (detectMetamask()) {
      listen();
    }
    return () => {
      stopListening();
    };
  }, []);
  return (
    <ChainContext.Provider value={props}>
      <Button />
      <Modal />
    </ChainContext.Provider>
  );
};

export const useDesiredChainId = () => {
  const { chainId } = React.useContext(ChainContext);
  if (!chainId) {
    throw new Error("No chainId provided");
  }
  return chainId;
};

export const useDesiredChainDisplayName = () => {
  const { chainDisplayName } = React.useContext(ChainContext);
  if (!chainDisplayName) {
    throw new Error("No chainDisplayName provided");
  }
  return chainDisplayName;
};
