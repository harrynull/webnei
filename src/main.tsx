import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {GRAPHQL_URL} from "./config";
import {MantineProvider} from "@mantine/core";

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <MantineProvider
              theme={{
                  fontFamily: 'Ark-Pixel',
              }}
          >
            <App />
          </MantineProvider>
      </ApolloProvider>
  </React.StrictMode>,
)
