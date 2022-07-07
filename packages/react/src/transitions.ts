import { toErrorWithMessage } from "./helpers";
import {
  push,
  setAddress,
  setBalance,
  setChainId,
  setState,
  State,
  wallet,
} from "./store";

type Action = {
  exitState: State;
  entryState: State;
};

// acceptable existing states with actions triggering.
const statePaths: Record<State, Set<State>> = {
  "server-side": new Set<State>(["detecting"]),
  detecting: new Set<State>(["no-metamask", "connected", "not-connected"]),
  "no-metamask": new Set<State>(["detecting"]),
  "not-connected": new Set<State>([
    "connecting",
    "ready-for-dapp",
    "wrong-network",
  ]),
  connecting: new Set<State>(["connected", "not-connected"]),
  connected: new Set<State>(["wrong-network", "ready-for-dapp"]),
  "wrong-network": new Set<State>(["changing-network"]),
  "changing-network": new Set<State>(["wrong-network", "ready-for-dapp"]),
  "ready-for-dapp": new Set<State>(["wrong-network", "not-connected"]),
};

/**
 * "Given a path, return true if the path is valid, otherwise return false."
 *
 * The function takes a path as an argument and returns a boolean. The path is an object with two
 * properties: entryState and exitState. The entryState property is the state that the machine is in
 * when the transition starts. The exitState property is the state that the machine is in when the
 * transition ends
 * @param path - { entryState: State; exitState: State }
 * @returns A function that takes a path and returns a boolean.
 */
const validateTransition = (path: { entryState: State; exitState: State }) => {
  return statePaths[path.entryState].has(path.exitState);
};

type ActionName =
  | "windowLoaded"
  | "detectedMetamask"
  | "detectedMetamaskAndUser"
  | "noMetmaskaskDetected"
  | "reloadAfterInstall"
  | "clickConnect"
  | "refuseConnect"
  | "acceptsConnection"
  | "detectWrongNetwork"
  | "detectRightNetwork"
  | "clickChangeNetwork"
  | "refuseChangeNetwork"
  | "acceptsChangeNetwork"
  | "userDisconnects";

// This is the chunk of the UX. It's an exercice in thinking about every event that happens between a dapp and a metamask.
export const transitions: Record<
  ActionName,
  (action: Action) => void | Promise<void>
> = {
  windowLoaded: async (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;

    if (typeof window.ethereum === "undefined") {
      transitions.noMetmaskaskDetected({
        entryState: action.exitState,
        exitState: "no-metamask",
      });
    } else {
      transitions.detectedMetamask({
        entryState: action.exitState,
        exitState: "not-connected",
      });
    }
    return;
  },
  detectedMetamask: async (action) => {
    console.log(action);
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }

    const storedWallet = localStorage.getItem("wen-metamask");
    const parsedWallet = storedWallet ? JSON.parse(storedWallet) : null;

    if (parsedWallet && parsedWallet.address) {
      wallet.address = parsedWallet.address;

      const chainId = await window.ethereum?.request({ method: "eth_chainId" });
      const balance = await window.ethereum?.request({
        method: "eth_getBalance",
        params: [wallet.address, "latest"],
      });
      wallet.balance = balance;
      wallet.chainId = chainId;

      setTimeout(() => {
        const exitState: State =
          chainId === wallet.desiredChainId
            ? "ready-for-dapp"
            : "wrong-network";
        transitions.detectedMetamaskAndUser({
          entryState: action.exitState,
          exitState,
        });
      }, 500);
    } else {
      console.log(wallet.state);
      wallet.state = action.exitState;
      // push();
    }

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        console.log("hello");
        if (accounts.length === 0) {
          wallet.address = null;
          wallet.balance = null;
          wallet.chainId = null;
          wallet.state = "not-connected";
          push();
          return;
        }

        wallet.address = accounts[0];
        const balance = await window.ethereum?.request({
          method: "eth_getBalance",
          params: [wallet.address, "latest"],
        });
        const chainId = await window.ethereum?.request({
          method: "eth_chainId",
        });

        wallet.balance = balance;
        wallet.chainId = chainId;
      });

      window.ethereum.on("chainChanged", (chainId: string) => {
        console.log("chain changed", chainId);
        wallet.chainId = chainId;
        if (chainId !== wallet.desiredChainId) {
          transitions.detectWrongNetwork({
            entryState: "ready-for-dapp",
            exitState: "wrong-network",
          });
        }
        if (chainId === wallet.desiredChainId) {
          transitions.detectRightNetwork({
            entryState: "changing-network",
            exitState: "ready-for-dapp",
          });
        }
      });
    }
  },
  detectedMetamaskAndUser: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    /* Setting the state and pushing it to the store. */
    wallet.state = action.exitState;
    push();
  },
  noMetmaskaskDetected: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },
  reloadAfterInstall: (action) => {},
  clickConnect: async (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;

    // give a bit of time before notifying UI since connection could be instant and we don't want to show
    // loading state in that case
    setTimeout(() => {
      push();
    }, 300);
    try {
      const addresses = await window.ethereum?.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (typeof addresses !== "undefined" && addresses.length > 0) {
        setAddress(addresses[0]);
        transitions.acceptsConnection({
          entryState: action.exitState,
          exitState: "connected",
        });
      }
    } catch (e) {
      const error = toErrorWithMessage(e);
      transitions.refuseConnect({
        entryState: action.exitState,
        exitState: "not-connected",
      });
    }
  },
  refuseConnect: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },
  acceptsConnection: async (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;

    const chainId = await window.ethereum?.request({ method: "eth_chainId" });
    setChainId(chainId);

    if (wallet.chainId !== wallet.desiredChainId) {
      transitions.detectWrongNetwork({
        entryState: action.exitState,
        exitState: "wrong-network",
      });
    } else {
      const balance = await window.ethereum?.request({
        method: "eth_getBalance",
        params: [wallet.address, "latest"],
      });
      setBalance(balance);
      transitions.detectRightNetwork({
        entryState: action.exitState,
        exitState: "ready-for-dapp",
      });
    }
  },
  detectWrongNetwork: async (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },

  clickChangeNetwork: async (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();

    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: wallet.desiredChainId }],
      });
      const chainId = await window.ethereum?.request({ method: "eth_chainId" });

      if (chainId === wallet.desiredChainId) {
        const balance = await window.ethereum?.request({
          method: "eth_getBalance",
          params: [wallet.address, "latest"],
        });
        setBalance(balance);
        setChainId(chainId);
        transitions.acceptsChangeNetwork({
          entryState: action.exitState,
          exitState: "ready-for-dapp",
        });
      }
    } catch (e) {
      transitions.refuseChangeNetwork({
        entryState: action.exitState,
        exitState: "wrong-network",
      });
    }
  },
  refuseChangeNetwork: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },
  acceptsChangeNetwork: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },
  detectRightNetwork: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    push();
  },

  userDisconnects: (action) => {
    if (!validateTransition(action)) {
      throw new Error(
        `Invalid state transition between ${action.entryState} and ${action.exitState}`
      );
    }
    wallet.state = action.exitState;
    wallet.address = null;
    wallet.balance = null;
    wallet.chainId = null;
    push();
  },
};
