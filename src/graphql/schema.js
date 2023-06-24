const typeDefs = `#graphql
  """
  This is the base User document schema
  """
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

  """
  Use this for query responses
  """
  type UserPayload {
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
  
  """
  Use this for User query input
  """
  input UserInput {
    username: String,
    avatar: String,
    thumbnail: String,
    email: String,
    role: Int,
    posts: Int,
    threads: Int,
    joined: String,
    lastOnline: String
  }

  """
  Base Model document schema
  """
  type Model {
    _id: ID!,
    model: String!,
    make: String!,
    thumbnail: String,
    threads: Int
  }

  """
  Use this for Model Query responses
  """
  type ModelPayload {
    model: String,
    make: String,
    thumbnail: String,
    threads: Int
  }

  """
  Use this type for Model query inputs
  """
  input ModelInput {
    model: String,
    make: String,
    thumbnail: String,
    threads: Int
  }

  """
  Base Thread document schema
  """
  type Thread {
    _id: ID!,
    title: String,
    model: ID!,
    user: ID!,
    created: String,
    lastPost: ID!
  }

  """
  Use this for Thread query payloads
  """
  type ThreadPayload {
    title: String,
    model: ID,
    user: ID,
    created: String,
    lastPost: ID
  }

  """
  Use this type for Thread query input
  """
  input ThreadInput {
    title: String,
    model: ID,
    user: ID,
    created: String,
    lastPost: ID
  }

  """
  Base Post document schema
  """
  type Post {
    _id: ID!,
    thread: ID!,
    user: ID!,
    created: String,
    content: String
  }

  """
  Use this for Post query payloads
  """
  type PostPayload {
    title: String,
    model: ID,
    user: ID,
    created: String,
    lastPost: ID
  }

  """
  Use this for Post query input
  """
  input PostInput {
    thread: ID,
    user: ID,
    created: String,
    content: String
  }

  """
  Use this as payload for delete mutations
  """
  type DeletePayload {
    success: Boolean!
    message: String
  }

  type Query {
    login(token: String!): UserPayload
    logout: UserPayload
    user(id: ID!): UserPayload
    users: [UserPayload]
    model(id: ID!): ModelPayload
    models: [ModelPayload]
    thread(id: ID!): ThreadPayload
    threads: [ThreadPayload]
    post(id: ID!): PostPayload
    posts: [PostPayload]
  }

  type Mutation {
    register(token: String!): UserPayload
    updateUser(id: ID!, input: UserInput!): UserPayload
    deleteUser(id: ID!): DeletePayload
    createModel(input: ModelInput!): ModelPayload
    updateModel(id: ID!, input: ModelInput!): ModelPayload
    deleteModel(id: ID!): DeletePayload
    createThread(input: ThreadInput!): ThreadPayload
    updateThread(id: ID!, input: ThreadInput!): ThreadPayload
    deleteThread(id: ID!): DeletePayload
    createPost(input: PostInput!): PostPayload
    updatePost(id: ID!, input: PostInput!): PostPayload
    deletePost(id: ID!): DeletePayload
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

module.exports = { typeDefs, resolvers };
