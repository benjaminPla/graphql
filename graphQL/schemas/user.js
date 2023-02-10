import { buildSchema } from "graphql";

const userSchema = buildSchema(`
  type User {
    id: String!
    email: String
  }
  type Query {
    getAllUsers: [User]
    getByIdUser(id: String): User
  }
  type Mutation {
    addUser(email: String, password: String!): User
    editByIdUser(id: String!, email: String, password: String!): User
    deleteByIdUser(id: String!): User
  }
`);

export default userSchema;
