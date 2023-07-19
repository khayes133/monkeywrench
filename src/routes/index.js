const express = require("express");
const router = express();
const { auth, requiresAuth } = require("express-openid-connect");
const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
require("dotenv").config();

//Configuration for OpenID Connect
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://dev-48o0hvsw8l1c35rp.us.auth0.com"
};

//Attach authentication middleware to the router
router.use(auth(config));

// Route handler for the root path
router.get("/", checkAuth);

// Route handler for GraphQL API
router.use(
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

//Function to check authentication status
function checkAuth(req, res) {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}

module.exports = router;
