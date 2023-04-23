import '~/styles/globals.css'
import React from "react";
import type { AppProps } from 'next/app'
import { preload } from 'swr';
import { swrFetcher } from '../fetchers';

preload("/api/user", () => swrFetcher("/api/user").catch((e) => {
  console.log("User not signed in")
}));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen min-w-screen bg-mantle-900 text-corn-blue-400 flex">
      <Component {...pageProps} />
    </main>
  )
}
