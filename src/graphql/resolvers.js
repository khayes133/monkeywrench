const Model = require("../models/models");
const Thread = require("../models/threads");
const Post = require("../models/posts");
const User = require("../models/users");

async function updateThreadCount(modelID) {
  const model = await Model.findById(modelID);
  await model.update( {threads: +model.threads});
  await model.save();
}

const resolvers = {
  Query: {
    getUserByID: async (root, args, context, info) => {
      // Example user query using context
      try {
        return await User.find({ _id: context.userID });
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching user");
      }
    },
    getModelByID: async (root, args, context, info) => {
      try {
        return await Model.findById(args.id);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching model");
      }
    },
    getModels: async (root, args, context, info) => {
      try {
        return await Model.find();
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching models");
      }
    },
    getThreadsByModel: async (root, args, context, info) => {
      try {
        return await Thread.find({ model: args.id });
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching threads");
      }
    },
    getThreadByID: async (root, args, context, info) => {
      try {
        return await Thread.findById(args.id);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching thread");
      }
    },
    getPostsByThread: async (root, args, context, info) => {
      try {
        return await Post.find({ thread: args.id });
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching posts");
      }
    },
    getPostByID: async (root, args, context, info) => {
      try {
        return await Post.findById(args.id);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching post");
      }
    }
  },
  Mutation: {
    createModel: async (root, args, context, info) => {
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
    updateModel: async (root, args, context, info) => {
      try {
        return await Model.findByIdAndUpdate(args.id, { ...args.input });
      } catch (error) {
        console.log(error);
        throw new Error("Error updating model");
      }
    },
    deleteModel: async (root, args, context, info) => {
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
    createThread: async (root, args, context, info) => {
      try {
        const id = context.userID;
        const thread = new Thread({
          ...args.input,
          created: new Date(),
          user: id
        });
        updateThreadCount(args.input.model);
        return await thread.save();
      } catch (err) {
        console.log(err);
        throw new Error("Error creating thread");
      }
    },
    updateThread: async (root, args, context, info) => {
      try {
        return await Thread.findByIdAndUpdate(args.id, {...args.input});
      } catch (error) {
        console.log(error);
        throw new Error("Error updating thread");
      }
    },
    deleteThread: async (root, args, context, info) => {
      try {
        const result = await Thread.findByIdAndDelete(args.id);
        if (result) {
          return { success: true };
        } else {
          return { success: false, message: "No thread found"};
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error deleting thread");
      }
    },
    createPost: async (root, args, context, info) => {
      try {
        const id = context.userID;
        const post = new Post({
          ...args.input,
          created: new Date(),
          user: id
        });
        return await post.save();
      } catch (error) {
        console.log(error);
        throw new Error("Error creating post");
      }
    },
    updatePost: async (root, args, context, info) => {
      try {
        return await Post.findByIdAndUpdate(args.id, args.input);
      } catch (error) {
        console.log(error);
        throw new Error("Error updating post");
      }
    },
    deletePost: async (root, args, context, info) => {
      try {
        const result = await Post.findByIdAndDelete(args.id);
        if (result) {
          return {success: true};
        } else  {
          return {success: false, message: "No post found"};
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error deleting post");
      }
    }
  }
};

module.exports = resolvers;
