const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

async function startServer() {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    introspection: process.env.NODE_ENV,
    context: ({ req }) => ({
      user: req.oidc?.user || null, // Access the authenticated user in resolvers
    })
  });

  // Start the server
  await server.start();

  // Set the path for api calls
  app.use("/graphql", cors(), json(), expressMiddleware(server));

  try {
    await mongoose.connect(process.env.DB_URI, { autoIndex: false, dbName: "forums"});
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
