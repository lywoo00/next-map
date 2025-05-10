import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient();
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(session)
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}