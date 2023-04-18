/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PusherProvider } from '@harelpls/use-pusher';

import '../styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const pusherConfig = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <PusherProvider {...pusherConfig}>
        {getLayout(<Component {...pageProps} />)}
      </PusherProvider>
    </QueryClientProvider>
  );
};

export default App;
