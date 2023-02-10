import { buildSchema } from "graphql";

const authSchema = buildSchema(`
  type Token {
    token: String!
  }
  type Query {
    getToken(email: String!): Token!
  }
`);

export default authSchema;
