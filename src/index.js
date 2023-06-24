const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const app = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
  await server.start();

  const graphqlPath = "/api/graphql";
  server.applyMiddleware({ app, path: graphqlPath });

  const port = 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}${graphqlPath}`);
  });
}

startServer();
