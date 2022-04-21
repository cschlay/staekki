import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import ky from "ky";

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Remove hard-coded url.
  return (
    <SWRConfig
      value={{
        fetcher: (url) => ky.get(`http://localhost:5000${url}`).json(),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
