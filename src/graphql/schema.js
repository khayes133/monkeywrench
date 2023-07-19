const { buildSchema } = require("graphql/utilities");

//Define the GraphQL schema for the API


const typeDefs = buildSchema(`#graphql

// User type represents a user document in the database
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
    _id: ID
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
    _id: ID
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
    _id: ID,
    content: String,
    user: ID,
    created: String,
    thread: ID
  }

  """
  Use this for Post query input
  """
  input PostInput {
    thread: ID,
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
  """ Get a user by ID"""
  getUserByID(id: ID!): UserPayload

  """ Get a model by ID"""
  getModelByID(id: ID!): ModelPayload

  """ Get a list of all models"""
  getModels: [ModelPayload]

  """ Get a thread by ID"""
  getThreadByID(id: ID!): ThreadPayload

  """ Get a list of all threads"""
  getThreads: [ThreadPayload]

  """ Get all threads belonging to a car model """
  getThreadsByModel(id: ID!): [ThreadPayload]

  """ Get a post by ID"""
  getPostByID(id: ID!): PostPayload

  """ Get a list of all posts"""
  getPosts: [PostPayload]

  """ Get all posts belonging to a Thread """
  getPostsByThread(id: ID!): [PostPayload]
}

  type Mutation {
  """ Register a user with a token"""
  register: UserPayload

  """Update a user by ID"""
  updateUser(input: UserInput!): UserPayload

  """Delete a user by ID"""
  deleteUser(id: ID!): DeletePayload

  """ Create a model"""
  createModel(input: ModelInput!): ModelPayload

  """ Update a model by ID"""
  updateModel(id: ID!, input: ModelInput!): ModelPayload

  """ Delete a model by ID"""
  deleteModel(id: ID!): DeletePayload

  """Create a thread"""
  createThread(input: ThreadInput!): ThreadPayload

  """ Update a thread by ID"""
  updateThread(id: ID!, input: ThreadInput!): ThreadPayload

  """ Delete a thread by ID"""
  deleteThread(id: ID!): DeletePayload

  """Create a post"""
  createPost(input: PostInput!): PostPayload

  """ Update a post by ID"""
  updatePost(id: ID!, input: PostInput!): PostPayload

  """Delete a post by ID"""
  deletePost(id: ID!): DeletePayload
}

`);

module.exports = typeDefs;
