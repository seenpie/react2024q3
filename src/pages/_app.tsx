import { AppProps } from "next/app";
import { wrapper } from "@/state";
import { Provider } from "react-redux";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import ThemeProvider from "../context/ThemeContext/ThemeProvider.tsx";
import "../assets/styles/global.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader.tsx";
import { Layout } from "@/components/Layout/Layout.tsx";

export default function MyApp({ Component, ...rest }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="next js" />
        <title>next js</title>
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <Layout>
            {isLoading ? <Loader /> : <Component {...props.pageProps} />}
          </Layout>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
