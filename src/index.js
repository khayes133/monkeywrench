const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./graphql/schema");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// Dummy data
const users = [
  { _id: 1, username: "test1" },
  { _id: 2, username: "test2" }
];

// Example resolvers
// testing from valencia branch
const resolvers = {
  Query: {
    user: async (args, context) => {
      return users[args.id];
    },
    users: async (args, context) => {
      // return await Users.find();
      return users;
    }
  }
};

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  introspection: true
});

async function startServer() {
  // Start the server at the specified port
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
