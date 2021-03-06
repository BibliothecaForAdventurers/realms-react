import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { StarknetProvider } from '@starknet-react/core';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BreakpointProvider } from '@/hooks/useBreakPoint';
import { WalletProvider } from '@/hooks/useWalletContext';
import '../styles/global.css';
/* import PageTransition from '@/components/navigation/PageTransition'; 
import { animated, Transition } from '@react-spring/web'; */

const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        realms:
          'https://api.thegraph.com/subgraphs/name/bibliothecaforadventurers/realms',
        starkIndexer:
          'https://starknet-indexer-c9bsk.ondigitalocean.app/graphql',
        ecosystem:
          'https://api.thegraph.com/subgraphs/name/bibliothecaforadventurers/loot-ecosystem',
      },
      httpSuffix: '',
      createHttpLink: () => createHttpLink(),
    }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          realms: concatPagination(['where', 'orderBy']),
          bridgedRealms: concatPagination(['where', 'orderBy']),
          // dungeons: concatPagination(['where']),
          // bags: concatPagination(['where']),
        },
      },
    },
  }),
});

// Create a react-query client
const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageWrapper = (Comp: any) =>
  class InnerPageWrapper extends React.Component<{ ua: string }> {
    /*
     * Need to use args.ctx
     * See https://nextjs.org/docs/advanced-features/custom-document
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getInitialProps(args: any) {
      return {
        ua: args.ctx.req
          ? args.ctx.req.headers['user-agent']
          : navigator.userAgent,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      const { ua, ...props } = this.props;
      return (
        <UserAgentProvider ua={ua}>
          <Comp {...props} />
        </UserAgentProvider>
      );
    }
  };
const queries = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BreakpointProvider queries={queries}>
      <WalletProvider>
        <ApolloProvider client={client}>
          <StarknetProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              {/* <PageTransition
                Component={Component}
                pageProps={pageProps}
              ></PageTransition> */}
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </StarknetProvider>
        </ApolloProvider>
      </WalletProvider>
    </BreakpointProvider>
  );
}

export default PageWrapper(MyApp);
