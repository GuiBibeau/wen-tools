type ErrorWithMessage = {
  message: string;
  code?: number;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

const getAddressFirstCharacters = (address: string) => address.slice(0, 5);

const getAddressLateCharacters = (address: string) =>
  address.slice(address.length - 5, address.length - 1);

export const getShortenedAddress = (address: string) =>
  `${getAddressFirstCharacters(address)}...${getAddressLateCharacters(
    address
  )}`;

export const hexaToEth = (hexString: string) => {
  const balance = BigInt(hexString);
  return Number(balance / BigInt("100000000000000")) / 10000;
};
