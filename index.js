import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import User from "./mongoSchemas/user.js";
import mongoose from "mongoose";
import "dotenv/config.js";

const api = express();
mongoose.connect("mongodb://localhost:27017/graphql");

const schema = buildSchema(`
  type User {
    id: String
    name: String
    email: String
  }
  type Query {
    getAllUsers: [User]
    getByIdUser(id: String): User
    getByNameUser(name: String): User
  }
  type Mutation {
    addUser(name: String, email: String): User
    deleteByIdUser(id: String): User
  }
`);

const root = {
  getAllUsers: async () => await User.find(),
  getByIdUser: async (data) => {
    const { id } = data;
    const user = await User.findOne({ _id: id });
    return user;
  },
  getByNameUser: async (data) => {
    const { name } = data;
    const user = await User.findOne({ name });
    return user;
  },
  addUser: async (data) => {
    const { name, email } = data;
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  },
  deleteByIdUser: async (data) => {
    const { id } = data;
    try {
      const deletedUser = await User.findOne({ _id: id });
      await User.deleteOne({ _id: id });
      return deletedUser;
    } catch (error) {
      return error;
    }
  },
};

api.use(
  "/user",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: process.env.ENVIRONMENT === "local",
  })
);

const PORT = process.env.PORT;
api.listen(PORT, () => console.log(`API running on port ${PORT}`));
