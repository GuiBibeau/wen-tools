import {
  disconnectWallet,
  setAddress,
  setBalance,
  setChainId,
  setConnected,
  state,
  toggleRequesting,
} from "./state";
import { isEthereumDefined } from "./helpers";

export const connectWallet = async () => {
  try {
    toggleRequesting();
    if (!isEthereumDefined()) {
      throw new Error("Metamask is not defined");
    }

    const addresses = await window.ethereum!.request({
      method: "eth_requestAccounts",
    });

    setAddress(addresses[0]);
    setConnected(true);

    const balance = await window.ethereum!.request({
      method: "eth_getBalance",
      params: [state.address, "latest"],
    });

    setBalance(balance);

    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    });

    setChainId(chainId);

    listen();
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(toggleRequesting, 1000);
  }
};

const chainChanged = (chainId: string) => {
  setChainId(chainId);
};

const accountsChanged = (addresses: string[]) => {
  if (addresses.length === 0) {
    disconnectWallet();
  }
  setAddress(addresses[0]);
};

export const listen = () => {
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountsChanged", accountsChanged);
};

export const stopListening = () => {
  if (window.ethereum.removeListener) {
    window.ethereum.removeListener("accountsChanged", accountsChanged);
    window.ethereum.removeListener("chainChanged", chainChanged);
  }
};

export const changeChain = async (chainId: string) => {
  try {
    toggleRequesting();
    await window.ethereum!.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    setChainId(chainId);
  } catch (error) {
    console.error(error);
  } finally {
    toggleRequesting();
  }
};

export const signMessage = async (message: string) => {
  try {
    toggleRequesting();
    const signature = await window.ethereum!.request({
      method: "eth_sign",
      params: [state.address, message],
    });
    return signature;
  } catch (error) {
    console.error(error);
  } finally {
    toggleRequesting();
  }
};

export const disconnect = () => {
  disconnectWallet();
};
