import { Select } from "@geist-ui/core";
import { ConnectButton } from "@wen-tools/react";
import React from "react";

export const PreviewTheme = () => {
  const [theme, setTheme] = React.useState("base");
  return (
    <>
      <Select
        style={{
          marginRight: "12px",
        }}
        value={theme}
        placeholder="Choose one"
        onChange={(value) => setTheme(String(value))}
      >
        <Select.Option value="base">base</Select.Option>
        <Select.Option value="dark">dark</Select.Option>
        <Select.Option value="w3fs">w3fs</Select.Option>
        <Select.Option value="midnight">midnight</Select.Option>
        <Select.Option value="elegant">elegant</Select.Option>
      </Select>
      <ConnectButton theme={theme} />
    </>
  );
};
