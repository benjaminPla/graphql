import express from "express";
import { graphqlHTTP } from "express-graphql";
import userSchema from "./graphQL/schemas/user.js";
import userRoot from "./graphQL/roots/user.js";
import loginSchema from "./graphQL/schemas/login.js";
import loginRoot from "./graphQL/roots/login.js";
import mongoose from "mongoose";
import "dotenv/config.js";
import { createClient } from "redis";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

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
  "/login",
  graphqlHTTP({
    schema: loginSchema,
    rootValue: loginRoot,
    graphiql: process.env.ENVIRONMENT === "local",
  })
);

api.use("/", (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
});

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
