"use client";

import React from "react";
import { ConfigProvider } from "antd";

const validateMessages = {
  required: "Vui lòng nhập ${name}!",
  string :{
    min: "${label} ít nhất ${min} ký tự",
  },
  pattern: {
    mismatch: "Vui lòng nhập đúng định dạng ${name}"
  }
}

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      form={{ validateMessages }}
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
            colorTextLabel: "#000",
          },
          Menu: {
            fontSize: 16,
            colorTextLabel: "#fff",
          },
          Divider: {
            fontSize: 16
          }
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
