/**
 * If the window object is defined, and the ethereum property is defined on the window object, then
 * return true, otherwise return false.
 * @returns A boolean value.
 */
import { proxy, subscribe, useSnapshot } from "valtio";

export const state: State = proxy({
	address: null,
	balance: null,
	connected: false,
	chainId: null,
	requesting: false,
	metamaskPresent: new Promise((resolve) => {
		if (typeof window === "undefined") {
			resolve(false);
		} else {
			if (window.ethereum) {
				console.log(localStorage.getItem("wen"));
				resolve(true);
			} else {
				resolve(false);
			}
		}
	}),
});

export const useWen = () => useSnapshot(state);

export const toggleRequesting = (): void => {
	state.requesting = !state.requesting;
};

export const setBalance = (balance: string): void => {
	state.balance = balance;
};

export const setAddress = (address: string): void => {
	state.address = address;
};

export const setConnected = (connected: boolean): void => {
	state.connected = connected;
};

export const setChainId = (chainId: string): void => {
	state.chainId = chainId;
};

export const disconnectWallet = async () => {
	try {
		state.requesting = true;

		state.address = null;
		state.balance = null;
		state.connected = false;
		state.chainId = null;
	} catch (error) {
		console.error(error);
	} finally {
		state.requesting = false;
	}
};

if (typeof window !== "undefined") {
	const savedState = localStorage.getItem("wen");
	if (savedState) {
		const parsedState = JSON.parse(savedState);
		state.address = parsedState.address;
		state.balance = parsedState.balance;
		state.connected = parsedState.connected;
		state.chainId = parsedState.chainId;
	}
}

subscribe(state, () => {
	if (typeof window !== "undefined") {
		localStorage.setItem("wen", JSON.stringify(state));
	}
});
