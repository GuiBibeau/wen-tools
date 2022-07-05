import React from "react";
import { Button } from "./Button";
import { NoMetamaskPanel } from "./NoMetamaskPanel";
import { Panel } from "./Panel";
import { useWenState, wallet } from "../store";
import "../style.css";
import { ConnectMetamaskPanel } from "./WalletPanel";
import { usePanelTitle } from "../hooks/usePannelTitle";

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

  const showConnectPanel = state === "no-metamask" ? false : true;

  return (
    <>
      <Button onClick={handleToggle} />
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
