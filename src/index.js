const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  type User {
    _id: ID!,
    username: String!,
    avatar: String,
    thumbnail: String,
    email: String!,
    role: Int,
    posts: Int,
    threads: Int,
    joined: String,
    lastOnline: String
  }

  type Model {
    _id: ID!,
    model: String!,
    make: String!,
    thumbnail: String,
    threads: Int
  }

  type Query {
    users: [User]!
  }

`;


// Dummy data
const users = [
  { _id: 1, username: "test1" },
  { _id: 2, username: "test2" },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

// TODO: Resolvers, Mock dataset

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  // Start the server at the specified port
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
