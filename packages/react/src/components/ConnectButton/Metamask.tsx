import React, { useState } from "react";
import { connectWallet } from "wen-actions";
import { detectMetamask } from "../../helpers";

import { close } from "../../state";
import { useTheme } from "../ButtonProvider";

export const MetamaskButton = () => {
	const [isMetamaskInstalled] = useState(detectMetamask());
	const { connectPill } = useTheme();

	const handleClick = async () => {
		try {
			await connectWallet();
		} catch (e) {
			console.error(e);
		} finally {
			setTimeout(close, 300);
		}
	};

	return (
		<div className="py-4">
			<div className="flex items-center space-x-4">
				<div className="flex-shrink-0">
					<img
						className="h-8 w-8 rounded-full"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
						alt="Metamask Logo"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<a
						target="_blank"
						href="https://metamask.io/download/"
						className="text-sm font-medium text-gray-900 truncate hover:border-black hover:border-b cursor-pointer pb-1 hover:border-dotted hover:after:content-['🔗'] hover:mr-2"
					>
						Metamask
					</a>
				</div>
				<div>
					{isMetamaskInstalled ? (
						<button onClick={handleClick} className={connectPill}>Connect</button>
					) : (
						<a
							href="https://metamask.io/download/"
							target="_blank"
							className={connectPill}
						>
							Download
						</a>
					)}
				</div>
			</div>
		</div>
	);
};
