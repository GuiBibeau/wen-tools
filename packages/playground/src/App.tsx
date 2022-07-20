import { useState } from "react";
import { ConnectButton } from "wen-react";
import reactLogo from "./assets/react.svg";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConnectButton />
    </div>
  );
}

export default App;
