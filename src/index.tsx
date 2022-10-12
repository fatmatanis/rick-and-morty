import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import "./index.scss";
import { FavoritesContextProvider } from "./store/favorites-contex";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FavoritesContextProvider>
        <App />
      </FavoritesContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
