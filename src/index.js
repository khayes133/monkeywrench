const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  type User {
    """
    Document ID
    """
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

  type Thread {
    _id: ID!,
    title: String,
    model: ID!,
    user: ID!,
    created: String,
    lastPost: ID!
  }

  type Post {
    _id: ID!,
    thread: ID!,
    user: ID!,
    created: String,
    content: String
  }

  type Query {
    login(token: String!): User
    logout: User
    user(id: ID!): User
    users: [User]
    model(id: ID!): Model
    models: [Model]
    thread(id: ID!): Thread
    threads: [Thread]
    post(id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    register(token: String!): User
    updateUser(id: ID!, user: String): User
  }

`;

// Dummy data
const users = [
  { _id: 1, username: "test1" },
  { _id: 2, username: "test2" }
];

// Example resolvers
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
  typeDefs,
  resolvers
});

async function startServer() {
  // Start the server at the specified port
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
