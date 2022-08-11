import React, { useEffect } from "react";
import { getShortenedAddress } from "../helpers";
import { open } from "../state";

import { useWen } from "@wen-tools/actions";

import "../style.css";
import { useDesiredChainId, useTheme } from "./ButtonProvider";

const Skeleton = () => {
  const theme = useTheme();

  return (
    <button type="button" onClick={open} className={theme.button}>
      <div className="w-32 bg-gray-100 h-6 rounded-md " />
    </button>
  );
};

export const Button = () => {
  const [loading, setLoading] = React.useState(true);
  const { metamaskPresent, address, chainId } = useWen();
  const theme = useTheme();
  const desiredChainId = useDesiredChainId();

  const wrongNetwork = `0x${desiredChainId.toString(16)}` !== chainId;

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, [metamaskPresent]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <button type="button" onClick={open} className={theme.button}>
      <div className="w-32 h-6">
        {!address && "Connect"}
        {address && wrongNetwork && "Wrong Network"}
        {address && !wrongNetwork && getShortenedAddress(address)}
      </div>
    </button>
  );
};
