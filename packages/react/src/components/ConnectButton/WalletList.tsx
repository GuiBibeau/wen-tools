import React from "react";
import { MetamaskButton } from "./Metamask";

const wallets = [];

export const WalletList = () => {
	return (
		<div>
			<div className="flow-root mt-6">
				<ul role="list" className="-my-5 "><MetamaskButton /></ul>
			</div>
			<div className="mt-6">
				<a
					href="#"
					className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
				>
					Don't have a Metamask?
				</a>
			</div>
		</div>
	);
};
