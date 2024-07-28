"use client";

import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2F54EB",
          fontFamily: `'__Noto_Serif_JP_aa0f35', '__Noto_Serif_JP_Fallback_aa0f35', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
          borderRadius: 8,
          colorText: "#000",
          fontSize: 14,
        },
        components: {
          Form: {
            fontSize: 12,
            labelFontSize: 14,
          },
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
