import React from "react";

export const NoMetamaskPanel = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className="pb-1 sm:pb-6">
        <div>
          <div className="overflow-hidden relative w-full after:pt-[56.25%] after:block">
            <iframe
              className="rounded absolute top-0 left-0 w-full h-full"
              width="400"
              height="224"
              src="https://www.youtube.com/embed/YVgfHZMFFFQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>
          <div className="mt-6 sm:mt-8 sm:flex sm:items-end">
            <div className="sm:flex-1">
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Your key to blockchain applications
                  </h3>
                </div>
                <span className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <p>
                    MetaMask provides an essential utility for blockchain
                    newcomers, token traders, crypto gamers, and developers.
                    Over a million downloads and counting!
                  </p>
                </span>
              </div>
              <div className="my-5 flex justify-center flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  className="inline-flex items-center  px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-metamask-blue-100 hover:bg-metamask-blue-200"
                >
                  Download
                </a>
              </div>
              <span className="mt-1 text-xs text-gray-900 sm:col-span-2 flex justify-center">
                <a className="cursor-pointer" onClick={handleReload}>
                  Refresh page after download &#x21bb;
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
