/* eslint-disable react-refresh/only-export-components */

import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import "@/assets/styles/global.css";
import { StoreProvider } from "./StoreProvider";
import ThemeProvider from "@/context/ThemeContext/ThemeProvider";
import { Layout } from "@/components/Layout/Layout";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer.tsx";
import Loader from "@/components/Loader/Loader.tsx";

export const metadata: Metadata = {
  title: "nextjs",
  description: "app routing nextjs",
  authors: { name: "seenpie", url: "https://github.com/seenpie" }
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <Suspense key="main" fallback={<Loader />}>
              <Layout>
                <Header />
                {children}
                <Footer />
              </Layout>
            </Suspense>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
