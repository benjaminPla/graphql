import { buildSchema } from "graphql";

const userSchema = buildSchema(`
  type User {
    id: String!
    name: String!
    email: String
  }
  type Query {
    getAllUsers: [User]
    getByIdUser(id: String): User
    getByNameUser(name: String): User
  }
  type Mutation {
    addUser(name: String!, email: String): User
    editByIdUser(id: String!, name: String, email: String): User
    deleteByIdUser(id: String!): User
  }
`);

export default userSchema;
