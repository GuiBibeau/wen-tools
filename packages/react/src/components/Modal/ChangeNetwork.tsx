import { Dialog } from "@headlessui/react";
import React from "react";
import { changeChain } from "@wen-tools/actions";

import { close } from "../../state";
import {
  useDesiredChainDisplayName,
  useDesiredChainId,
  useTheme,
} from "../ButtonProvider";

export const ChangeNetwork = () => {
  const desiredChainId = useDesiredChainId();
  const desiredChainDisplayName = useDesiredChainDisplayName();
  const { button, header, text } = useTheme();
  const handleClick = async () => {
    await changeChain(`0x${desiredChainId.toString(16)}`);
    close();
  };
  return (
    <>
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className={header}>
            Wrong network
          </Dialog.Title>
          <div className="mt-2">
            <p className={`mb-4 ${text}`}>
              Please connect to the
              <span className="capitalize">{` ${desiredChainDisplayName} `}</span>
              network to use this app.
            </p>
            <button type="button" className={button} onClick={handleClick}>
              Switch network
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
