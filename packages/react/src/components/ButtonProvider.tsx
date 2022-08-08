import React, { useEffect } from "react";
import { Button } from "./Button";
import { listen, stopListening } from "@wen-tools/actions";
import { detectMetamask, parseChainId, parseChainName } from "../helpers";
import Modal from "./Modal/Container";
import { Theme, themeMap } from "./theme";

type Props = {
  chainId?: number | string;
  chainDisplayName?: string;
  theme?: Theme;
};

const ChainContext = React.createContext<Props>({
  chainId: 1,
  chainDisplayName: "Ethereum",
  theme: "base",
});

export const ConnectButton = ({
  chainId = 1,
  chainDisplayName = "Ethereum",
  theme = "base",
}: {
  chainId?: number;
  chainDisplayName?: string;
  theme?: Theme;
}) => {
  useEffect(() => {
    if (detectMetamask()) {
      listen();
    }
    return () => {
      stopListening();
    };
  }, []);
  const chainContext = {
    chainId: parseChainId(chainId),
    chainDisplayName: parseChainName(chainId),
    theme,
  };
  return (
    <ChainContext.Provider value={chainContext}>
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

export const useTheme = () => {
  const { theme } = React.useContext(ChainContext);
  if (!theme) {
    throw new Error("No theme provided");
  }
  return themeMap[theme];
};
