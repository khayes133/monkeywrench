const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { typeDefs, resolvers } = require("./graphql/schema");
const app = express();

async function startServer() {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    introspection: true
  });
  
  // Start the server
  await server.start();
  
  // Set the path for api calls
  const graphqlPath = "/api";
  server.applyMiddleware({ app, path: graphqlPath });

  const port = 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}${graphqlPath}`);
  });
}

startServer();
