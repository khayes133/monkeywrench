const express = require("express");
const router = express();
const { auth, requiresAuth } = require("express-openid-connect");
const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://dev-48o0hvsw8l1c35rp.us.auth0.com"
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get("/", checkAuth);

// Set the path for api calls
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

function checkAuth(req, res) {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}

module.exports = router;
