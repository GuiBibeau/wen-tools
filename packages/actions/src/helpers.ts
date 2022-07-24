export const isEthereumDefined = (): boolean => {
	if (typeof window === "undefined") {
		return false;
	}
	return window.ethereum !== undefined;
};

/**
 * It takes a number and returns a hexadecimal string
 * @param {number} chainId - The chain ID of the network you want to connect to.
 * @returns A string that is the hexadecimal representation of the chainId.
 */
export const toChainHexadecimal = (chainId: number): string => {
	return `0x${chainId.toString(16)}`;
};
