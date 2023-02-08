import express from "express";
import { graphqlHTTP } from "express-graphql";
import userSchema from "./graphQL/schemas/user.js";
import userRoot from "./graphQL/roots/user.js";
import mongoose from "mongoose";
import "dotenv/config.js";

const api = express();
try {
  await mongoose.connect("mongodb://localhost:27017/graphql");
} catch (error) {
  process.exit(console.log(error));
}

api.use(
  "/user",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: process.env.ENVIRONMENT === "local",
  })
);

const PORT = process.env.PORT;
api.listen(PORT, () => console.log(`API running on port ${PORT}`));
