import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import Layout from "@/components/04-layouts/Layout";
import App from "./app";

const RedHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Anyflow",
  description: "Deploy contracts in the smart way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics Script */}

      <body className={RedHatDisplay.className}>
        <App>
          <Layout>{children}</Layout>
        </App>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SKK0VDXDSR"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SKK0VDXDSR');
            `,
          }}
        />
      </body>
    </html>
  );
}
