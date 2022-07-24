import React, { useEffect } from "react";
import { getShortenedAddress } from "../helpers";
import { open } from "../state";

import { useWen } from "wen-actions";

import "../style.css";
import { useDesiredChainId } from "./ButtonProvider";

const Skeleton = () => {
	return (
		<button
			type="button"
			onClick={open}
			className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<div className="w-32 bg-gray-300 h-6 rounded-md " />
		</button>
	);
};

export const Button = () => {
	const [loading, setLoading] = React.useState(true);
	const { metamaskPresent, address, chainId } = useWen();
	const desiredChainId = useDesiredChainId();

	const wrongNetwork = `0x${desiredChainId.toString(16)}` !== chainId;

	useEffect(() => {
		setTimeout(() => setLoading(false), 600);
	}, [metamaskPresent]);

	if (loading) {
		return <Skeleton />;
	}

	return (
		<button
			type="button"
			onClick={open}
			className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<div className="w-32 h-6">
				{!address && "Connect"}
				{address && wrongNetwork && "Wrong Network"}
				{address && !wrongNetwork && getShortenedAddress(address)}
			</div>
		</button>
	);
};
