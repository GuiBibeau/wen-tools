import { getShortenedAddress } from "../helpers";
import { useWallet, useWenState } from "../store";

export const usePanelTitle = () => {
  const state = useWenState();
  const wallet = useWallet();
  const connect = "Account: ";
  const notInstalled = "Metamask is not installed!";
  const wrongNetwork = "Wrong Network";
  const ready = `Account: ${
    wallet.address && getShortenedAddress(wallet.address)
  }`;

  switch (state) {
    case "connecting":
      return connect;
    case "not-connected":
      return connect;
    case "ready-for-dapp":
      return ready;
    case "wrong-network":
      return wrongNetwork;
    case "no-metamask":
      return notInstalled;

    default:
      return connect;
  }
};
