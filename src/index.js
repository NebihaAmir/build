import React from "react";
import ReactDOM from "react-dom";
import { createUploadLink } from "apollo-upload-client";
import App from "./App";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./redux/store";
// http://localhost:5000/graphql
//    uri: "http://157.230.190.157/graphql",

const client = new ApolloClient({
  link: createUploadLink({
    uri:"http://157.230.190.157/graphql",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
