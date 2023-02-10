import express from "express";
import { graphqlHTTP } from "express-graphql";
import userSchema from "./graphQL/schemas/user.js";
import userRoot from "./graphQL/roots/user.js";
import mongoose from "mongoose";
import "dotenv/config.js";
import { createClient } from "redis";
import rateLimit from "express-rate-limit";

const api = express();

try {
  await mongoose.connect("mongodb://localhost:27017/graphql");
} catch (error) {
  console.log("mongoose connection error");
  process.exit(error);
}

const redis = createClient();
try {
  await redis.connect();
} catch (error) {
  console.log("redis connection error");
  process.exit(error);
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});
api.use(limiter);

api.use(
  "/user",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: process.env.ENVIRONMENT === "local",
  })
);

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => console.log(`API running on port ${PORT}`));
