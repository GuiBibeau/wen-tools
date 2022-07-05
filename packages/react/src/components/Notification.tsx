import React, { type FC } from "react";

type Props = {
  title: string;
  subtitle: string;
  icon: JSX.Element;
};

export const Notification: FC<Props> = ({ title, subtitle, icon }) => {
  return (
    <div
      aria-live="assertive"
      className="inset-0 flex items-end px-4 py-4 pointer-events-none sm:p-6"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end ">
        <div className="max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-metamask-grey">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex h-full items-center justify-center">
                <div className="flex-shrink-0">{icon}</div>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-xs text-white">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
