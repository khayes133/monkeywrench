const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { json } = require("body-parser");
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
  app.use("/graphql", json(), expressMiddleware(server));

  const port = 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/graphql`);
  });
}

startServer();
