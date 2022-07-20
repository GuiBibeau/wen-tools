# Wen React

**Wen Tools are under heavy development**

React component to connect your users quickly

## Getting Started

Wen React is a component that allows you to connect to wallets in 1 line of code in any React 18 app.

```sh
npm i wen-actions wen-react
# or
yarn add wen-actions wen-react
# or
pnpm i wen-actions wen-react
```

## Connect users

Just render the kit component. It includes everything to connect to a wallet and right network.

```jsx
import { ConnectButton } from "wen-react";

export default function Home() {
  return (
    <div>
      <ConnectButton />
    </div>
  );
}
```

## Specify the network to use

All chains are supported, you only need to pass in the chain id (find them [here](https://chainlist.org/)).

```jsx
import { ConnectButton } from "wen-react";

export default function Home() {
  return (
    <div>
      <ConnectButton chainId="4" chainDisplayName="Rinkeby" />
    </div>
  );
}
```

## Reading wallet data

[Wen-Actions](/packages/wen-actions)
