const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://dev-48o0hvsw8l1c35rp.us.auth0.com"
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Set the path for api calls
app.use(
  "/graphql",
  requiresAuth(),
  graphqlHTTP((req) => {
    return {
      schema: typeDefs,
      rootValue: resolvers,
      context: {
        user: req.oidc.user || null // Access the authenticated user in resolvers
      },
      graphiql: process.env.NODE_ENV === "development"
    };
  })
);

// Connect to mongoose and start the express server
try {
  mongoose.connect(process.env.DB_URI, { autoIndex: false, dbName: "forums" });
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/graphql`);
  });
} catch (error) {
  console.log(error);
}
