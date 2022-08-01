import { Dialog } from "@headlessui/react";
import React from "react";
import { changeChain } from "wen-actions";

import { close } from "../../state";
import {
	useDesiredChainDisplayName,
	useDesiredChainId,
	useTheme,
} from "../ButtonProvider";

export const ChangeNetwork = () => {
	const desiredChainId = useDesiredChainId();
	const desiredChainDisplayName = useDesiredChainDisplayName();
	const theme = useTheme();
	const handleClick = async () => {
		await changeChain(`0x${desiredChainId.toString(16)}`);
		close();
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
					<p className="text-sm text-gray-500 mb-4">
						Please connect to the {desiredChainDisplayName}
						{' '}network to use this app.
					</p>
					<button type="button" className={theme.button} onClick={handleClick}>
						Switch network
					</button>
				</div>
			</div>
		</div>
		</>
	);
};
