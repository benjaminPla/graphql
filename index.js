import express from "express";
import { graphqlHTTP } from "express-graphql";
import userSchema from "./graphQL/schemas/user.js";
import userRoot from "./graphQL/roots/user.js";
import authSchema from "./graphQL/schemas/auth.js";
import authRoot from "./graphQL/roots/auth.js";
import "./mongo/connection.js";
import "./redis/connection.js";
import "dotenv/config.js";
import rateLimit from "express-rate-limit";
import authMiddleware from "./middlewares/auth.js";

const api = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});
api.use(limiter);

api.use(
  "/auth",
  graphqlHTTP({
    schema: authSchema,
    rootValue: authRoot,
    graphiql: process.env.ENVIRONMENT === "local",
  })
);

api.use(authMiddleware);

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
