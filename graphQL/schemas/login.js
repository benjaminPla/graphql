import { buildSchema } from "graphql";

const loginSchema = buildSchema(`
  type Token {
    token: String!
  }
  type Query {
    getToken(email: String!): Token!
  }
`);

export default loginSchema;
