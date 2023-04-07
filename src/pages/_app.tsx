// import "@/styles/globals.css";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { EntryContextProvider } from "@/contexts/EntryContext";
import { RatesContextProvider } from "@/contexts/RatesContext";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RatesContextProvider>
      <EntryContextProvider>
        <main className={inter.className}>
          {" "}
          <Component {...pageProps} />{" "}
        </main>
      </EntryContextProvider>
    </RatesContextProvider>
  );
}
