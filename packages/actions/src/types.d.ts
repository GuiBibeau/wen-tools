type InjectedProviders = {
  isMetaMask?: true;
};

interface Window {
  ethereum: InjectedProviders & {
    on: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    request<T = any>(args: RequestArguments): Promise<T>;
  };
}

type ChainId = "0x1" | "0x4";

type ChainMap = Record<ChainId, { name: string; symbol: string }>;

type State = {
  metamaskPresent: Promise<boolean>;
  address: string | null;
  balance: string | null;
  connected: boolean;
  chainId: string | null;
  requesting: boolean;
};
