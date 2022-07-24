import React from "react";
import { WalletList } from "../ConnectButton/WalletList";

export const ConnectModalBody = () => {
	return (
		<div className="h-full">
			<main className="max-w-7xl mx-auto pb-10">
				<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
					<aside className="py-6 px-2 lg:px-0 lg:col-span-12"><WalletList /></aside>
					<div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-0" />
				</div>
			</main>
		</div>
	);
};
