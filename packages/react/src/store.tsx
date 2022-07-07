import { useSyncExternalStore } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";
import { transitions } from "./transitions";

export type State =
  | "server-side"
  | "detecting"
  | "no-metamask"
  | "not-connected"
  | "connecting"
  | "connected"
  | "wrong-network"
  | "changing-network"
  | "ready-for-dapp";

type Wallet = {
  address: string | null;
  balance: string | null;
  connected: boolean;
  chainId: string | null;
  desiredChainId: string | null;
  state: State;
};

// store containing information about the user and the wallet
export let wallet: Wallet = proxy({
  address: null,
  balance: null,
  connected: false,
  chainId: null,
  desiredChainId: null,
  state: "server-side",
});

subscribe(wallet, () => {
  localStorage.setItem("wen-metamask", JSON.stringify(wallet));
});

// set of subscribers destinations that will receive updates from the store
const destinations = new Set<VoidFunction>();

/**
 * Notify instances of the hook of a state change. We only need to notify on changes relevant to the UI. This keeps the UX crisp
 */
export const push = () => {
  destinations.forEach((notifyDestination) => notifyDestination());
};

function subscribeStore(notify: VoidFunction) {
  destinations.add(notify);

  return () => destinations.delete(notify);
}

if (typeof window !== "undefined") {
  transitions.windowLoaded({
    entryState: "server-side",
    exitState: "detecting",
  });
}

/**
 * `useWenMetamask` is a React hook that returns a `wallet` object. We use externalSyncStore since
 *  the data representes a state outside react.
 */
export const useWenState = () =>
  useSyncExternalStore(
    subscribeStore,
    () => {
      return wallet.state;
    },
    () => {
      return wallet.state;
    }
  );

export const useAddress = () =>
  useSyncExternalStore(
    subscribeStore,
    () => wallet.address,
    () => wallet.address
  );

export const useWallet = () => useSnapshot(wallet);

export const setAddress = (address: string | null) => {
  wallet.address = address;
};

export const setChainId = (chainId: string | null) => {
  wallet.chainId = chainId;
};

export const setBalance = (balance: string | null) => {
  wallet.balance = balance;
};

export const setState = (state: State) => {
  wallet.state = state;
};
