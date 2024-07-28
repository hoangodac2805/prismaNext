import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "@/styles/index.scss";
import { AuthProvider } from "@/contexts/AuthContext";
import ToasterProvider from "@/contexts/ToasterContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LoadingScreen from "@/components/LoadingScreen";
const noto_serif = Noto_Serif_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_serif.className}>
        <ToasterProvider />
        <LoadingScreen />
        <AuthProvider>
          <AntdRegistry>
           {children}
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
