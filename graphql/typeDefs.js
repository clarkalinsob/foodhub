const gql = require("graphql-tag");

module.exports = gql`
    type Food {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String
        username: String!
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
        getFood(foodId: ID!): Food
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createFood(body: String!): Food!
        deleteFood(foodId: ID!): String!
        createComment(foodId: ID!, body: String!): Food!
        deleteComment(foodId: ID!, commentId: ID!): Food!
        likeFood(foodId: ID!): Food!
    }
`;
