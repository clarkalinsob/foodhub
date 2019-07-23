const gql = require('graphql-tag');

module.exports = gql `
    type Food {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getFoods: [Food]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password:String!): User!
    }
`