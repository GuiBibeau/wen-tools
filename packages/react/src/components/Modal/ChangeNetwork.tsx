import { Dialog } from "@headlessui/react";
import React from "react";
import { changeChain } from "wen-actions";
import {
	useDesiredChainDisplayName,
	useDesiredChainId,
} from "../ButtonProvider";

export const ChangeNetwork = () => {
	const desiredChainId = useDesiredChainId();
	const desiredChainDisplayName = useDesiredChainDisplayName();
	//@ts-ignore
	const handleClick = async () => {
		await changeChain(`0x${desiredChainId.toString(16)}`);
	};
	return (
		<>
		<div>
			<div className="mt-3 text-center sm:mt-5">
				<Dialog.Title
					as="h3"
					className="text-lg leading-6 font-medium text-gray-900"
				>
					Wrong network
				</Dialog.Title>
				<div className="mt-2">
					<p className="text-sm text-gray-500">
						Please connect to the {desiredChainDisplayName}
						network to use this app.
					</p>
					<button
						type="button"
						className="inline-flex justify-center rounded-md px-4 py-2 mt-4 text-base font-medium  sm:text-sm border-gray-300 border"
						onClick={handleClick}
					>
						Switch network
					</button>
				</div>
			</div>
		</div>
		</>
	);
};
