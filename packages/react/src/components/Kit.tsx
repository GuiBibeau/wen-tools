import React, { Suspense } from "react";
import { Button } from "./Button";
import { NoMetamaskPanel } from "./NoMetamaskPanel";
import { Panel } from "./Panel";
import { useWenState, wallet } from "../store";
import { ConnectMetamaskPanel } from "./WalletPanel";
import { usePanelTitle } from "../hooks/usePannelTitle";
import "../style.css";

type Props = {
  chainId: ChainId;
};

export const Kit: React.FC<Props> = ({ chainId = "0x1" }) => {
  const [open, setOpen] = React.useState(false);
  const pannelTitle = usePanelTitle();
  const state = useWenState();
  wallet.desiredChainId = chainId;

  const handleToggle = () => {
    setOpen(!open);
  };

  const showConnectPanel = state !== "no-metamask";

  return (
    <>
      <Suspense
        fallback={
          <button className="items-center w-44 h-12 flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200">
            <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
              <div className="w-24 bg-gray-300 h-4 rounded-md " />
            </div>
          </button>
        }
      >
        <Button onClick={handleToggle} />
      </Suspense>
      {open && (
        <Panel handleClose={handleToggle} title={pannelTitle}>
          {state === "no-metamask" && <NoMetamaskPanel />}
          {showConnectPanel && (
            <ConnectMetamaskPanel
              handleClose={handleToggle}
              chainId={chainId}
            />
          )}
        </Panel>
      )}
    </>
  );
};
