/*This code provides a set of resolver functions that interact 
with the database models to handle GraphQL queries and mutations
related to users, models, threads, and posts*/

//Importing Dependencies from "../models" directory
const Model = require("../models/models");
const Thread = require("../models/threads");
const Post = require("../models/posts");
const User = require("../models/users");

/*Utility Functions that update the counts of threads and posts 
associated with models and users in the database. The functions
take an ID parameter and an optional boolean parameter 'subtract'
which determines whether to increment or decrement the count*/

async function updateModelThreadCount(modelID, subtract = false) {
  try {
    const model = await Model.findById(modelID);
    subtract ? --model.threads : ++model.threads;
    await model.save();
  } catch (error) {
    console.log(error);
  }
}

async function updateThreadPostCount(threadID, subtract = false) {
  try {
    const thread = await Thread.findById(threadID);
    subtract ? --thread.posts : ++thread.posts;
    await thread.save();
  } catch (error) {
    console.log(error);
  }
}

async function updateUserThreadCount(id, subtract = false) {
  try {
    const user = await User.findById(id);
    subtract ? --user.threads : ++user.threads;
    await user.save();
  } catch (error) {
    console.log(error);
  }
}

async function updateUserPostCount(id, subtract = false) {
  try {
    const user = await User.findById(id);
    subtract ? --user.posts : ++user.posts;
    await user.save();
  } catch (error) {
    console.log(error);
  }
}
/*Resolver Functions correspond to different GraphQL queries and mutations.
Each resolver function interacts with the database models and performs
the required operations. */
const resolvers = {
  getUserByID: async (args, context) => {
    try {
      return await User.findById(args.id);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching user");
    }
  },
  getModelByID: async (args, context) => {
    try {
      return await Model.findById(args.id);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching model");
    }
  },
  getModels: async (args, context) => {
    try {
      return await Model.find();
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching models");
    }
  },
  getThreadsByModel: async (args, context) => {
    try {
      return await Thread.find({ model: args.id });
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching threads");
    }
  },
  getThreadByID: async (args, context) => {
    try {
      return await Thread.findById(args.id);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching thread");
    }
  },
  getPostsByThread: async (args, context) => {
    try {
      return await Post.find({ thread: args.id });
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  },
  getPostByID: async (args, context) => {
    try {
      return await Post.findById(args.id);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  },
  register: async (args, context) => {
    try {
      const userData = context.user;
      const newUser = new User({
        email: userData.email,
        joined: new Date(),
        lastOnline: new Date(),
        role: 1,
        posts: 0,
        threads: 0,
        sub: userData.sub
      });
      return await newUser.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error registering user");
    }
  },
  updateUser: async (args, context) => {
    try {
      const userData = context.user;
      return await User.findOneAndUpdate({ sub: userData.sub }, { ...args.input });
    } catch (error) {
      console.log(error);
      throw new Error("Error updating user");
    }
  },
  createModel: async (args, context) => {
    try {
      const model = new Model({
        ...args.input
      });
      return await model.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error creating model");
    }
  },
  updateModel: async (args, context) => {
    try {
      return await Model.findByIdAndUpdate(args.id, { ...args.input });
    } catch (error) {
      console.log(error);
      throw new Error("Error updating model");
    }
  },
  deleteModel: async (args, context) => {
    try {
      const result = await Model.findByIdAndDelete(args.id);
      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "No model found" };
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting model");
    }
  },
  createThread: async (args, context) => {
    try {
      const user = await User.findOne({ sub: context.user.sub });
      const thread = new Thread({
        ...args.input,
        created: new Date(),
        user: user.id
      });
      updateModelThreadCount(args.input.model);
      updateUserThreadCount(user.id);
      return await thread.save();
    } catch (err) {
      console.log(err);
      throw new Error("Error creating thread");
    }
  },
  updateThread: async (args, context) => {
    try {
      return await Thread.findByIdAndUpdate(args.id, { ...args.input });
    } catch (error) {
      console.log(error);
      throw new Error("Error updating thread");
    }
  },
  deleteThread: async (args, context) => {
    try {
      const result = await Thread.findByIdAndDelete(args.id);
      if (result) {
        updateModelThreadCount(result.model, true);
        return { success: true };
      } else {
        return { success: false, message: "No thread found" };
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting thread");
    }
  },
  createPost: async (args, context) => {
    try {
      const user =  await User.findOne({sub: context.user.sub});
      const post = new Post({
        ...args.input,
        created: new Date(),
        user: user.id
      });
      updateThreadPostCount(args.input.thread);
      updateUserPostCount(user.id);
      return await post.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error creating post");
    }
  },
  updatePost: async (args, context) => {
    try {
      return await Post.findByIdAndUpdate(args.id, args.input);
    } catch (error) {
      console.log(error);
      throw new Error("Error updating post");
    }
  },
  deletePost: async (args, context) => {
    try {
      const result = await Post.findByIdAndDelete(args.id);
      if (result) {
        updateThreadPostCount(result.thread, true);
        updateUserPostCount(result.user, true);
        return { success: true };
      } else {
        return { success: false, message: "No post found" };
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting post");
    }
  }
};

module.exports = resolvers;
