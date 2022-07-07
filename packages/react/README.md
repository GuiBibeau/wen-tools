<p align="center">
<img src="../../logo.svg" alt="wen-tools" >
</p>

# Wen React

Connecting to wallets in 1 line of code in any React 18 app.

## Geting Started

Wen React does not depends on any other package such as Wagmi and Ethers but complements them nicely.

```sh
npm i wen-react
# or
yarn add wen-react
# or
pnpm i wen-react
```

## Connect users

Just render the kit component. It includes everything to connect to a wallet and right network.

```jsx
import { Kit } from "wen-metamask";

export default function Home() {
  return (
    <div>
      <Kit />
    </div>
  );
}
```
