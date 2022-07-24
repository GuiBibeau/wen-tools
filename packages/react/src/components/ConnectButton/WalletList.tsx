import React from "react";
import { MetamaskButton } from "./Metamask";

const wallets = [
	{
		name: "Wallet Connect",
		url: "https://walletconnect.com/",
		imageUrl:
			"https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
	},
	{
		name: "Coinbase",
		url: "https://www.coinbase.com/wallet",
		imageUrl: "https://avatars.githubusercontent.com/u/18060234?s=280&v=4",
	},
];

export const WalletList = () => {
	return (
		<div>
			<div className="flow-root mt-6">
				<ul role="list" className="-my-5 ">
					<MetamaskButton />
					{wallets.map(
						(wallet) => (
							<li key={wallet.name} className="py-4">
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<img
											className="h-8 w-8 rounded-full"
											src={wallet.imageUrl}
											alt=""
										/>
									</div>
									<div className="flex-1 min-w-0">
										<a
											target="_blank"
											href={wallet.url}
											className="text-sm font-medium text-gray-900 truncate hover:border-black hover:border-b cursor-pointer pb-1 hover:border-dotted hover:after:content-['🔗'] hover:mr-2"
										>
											{wallet.name}
										</a>
									</div>
									<div>
										<a
											href="#"
											className="inline-flex items-center shadow px-2.5 py-0.5 text-sm leading-5 font-medium rounded-full text-gray-700 bg-gray-50 hover:bg-gray-100"
										>
											Connect
										</a>
									</div>
								</div>
							</li>
						),
					)}
				</ul>
			</div>
			<div className="mt-6">
				<a
					href="#"
					className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
				>
					Don't have a wallet?
				</a>
			</div>
		</div>
	);
};
