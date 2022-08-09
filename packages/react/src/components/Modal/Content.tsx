import React from "react";
import { useWen } from "@wen-tools/actions";
import { useDesiredChainId } from "../ButtonProvider";
import { ConnectModalBody } from "./Connect";
import { ModalHeader } from "./Header";
import { ChangeNetwork } from "./ChangeNetwork";

export const ModalContent = () => {
	const { chainId, connected, requesting } = useWen();
	const desiredChainId = useDesiredChainId();
	const wrongNetwork = `0x${desiredChainId.toString(16)}` !== chainId;

	return (
		<>
		<ModalHeader />
		{!connected && <ConnectModalBody />}
		{connected && wrongNetwork && !requesting && <ChangeNetwork />}
		</>
	);
};
