import React from "react";
import { useTheme } from "./ButtonProvider";

export const ConnectedPill = () => {
	const { connectedPill } = useTheme();
	return <span className={connectedPill}>Connected</span>;
};

export const NotConnectedPill = () => {
	const { notConnectedPill } = useTheme();

	return <span className={notConnectedPill}>Not Connected</span>;
};

export const LoadingPill = () => {
	const { loadingPill } = useTheme();
	return (
		<span className={loadingPill}>
			<p className="mr-2">Loading</p>
			<div
				style={{ borderTopColor: "transparent" }}
				className="w-3 h-3 border-2 border-sky-100 border-solid rounded-full animate-spinner"
			/>
		</span>
	);
};
