import { chainsMap } from "./chains";

type ErrorWithMessage = {
	message: string;
	code?: number;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === "object" &&
			error !== null &&
			("message" in error) &&
			typeof (error as Record<string, unknown>).message === "string"
	);
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) {
		return maybeError;
	}

	try {
		return new Error(JSON.stringify(maybeError));
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError));
	}
}

const getAddressFirstCharacters = (address: string) => address.slice(0, 5);

const getAddressLateCharacters = (address: string) =>
	address.slice(address.length - 5, address.length - 1);

export const getShortenedAddress = (address: string) =>
	`${getAddressFirstCharacters(address)}...${getAddressLateCharacters(
		address,
	)}`;

export const hexaToEth = (hexString: string) => {
	const balance = BigInt(hexString);
	return Number(balance / BigInt("100000000000000")) / 10000;
};

/**
 * If the window object exists, and the ethereum object exists, and the isMetaMask function exists,
 * then return true.
 * @returns A boolean value.
 */
export const detectMetamask = () => {
	return (
		typeof window !== "undefined" &&
			typeof window.ethereum !== "undefined" &&
			typeof window.ethereum.isMetaMask !== "undefined"
	);
};

export const isChainId = (
	chainId: number,
): chainId is keyof typeof chainsMap => {
	return chainId in chainsMap;
};

/**
 * It takes a chain ID and returns the name of the chain
 * @param {"string" | "number"} chain - The chain ID of the network you want to connect to.
 * @returns A string
 */
export const parseChainName = (chain: string | number) => {
	if (typeof chain === "number") {
		if (isChainId(chain)) {
			return chainsMap[chain];
		}
	}

	if (typeof chain === "string") {
		const chainId = chain.startsWith("0x") ? chain.slice(2) : chain;
		const chainIdNumber = parseInt(chainId, 16);
		if (isChainId(chainIdNumber)) {
			return chainsMap[chainIdNumber];
		}
	}

	return "unknown";
};

export const parseChainId = (chain: string | number) => {
	if (typeof chain === "number") {
		return chain;
	}

	if (typeof chain === "string") {
		const chainId = chain.startsWith("0x") ? chain.slice(2) : chain;
		return parseInt(chainId, 16);
	}

	return 0;
};
