"use client";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

interface Props {
  children?: React.ReactNode;
}
export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <Component {...pageProps} /> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};

// export default function AuthContext({ children }: Props) {
//   return <SessionProvider>{children}</SessionProvider>;
// }
