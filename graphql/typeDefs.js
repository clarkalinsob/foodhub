const gql = require("graphql-tag");

module.exports = gql`
    type Menu {
        id: ID!
        createdAt: String!
        body: String!
        username: String!
        meals: [Meal]!
        likes: [Like]!
        _user: ID!
    }
    type Food {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
        _user: ID!
    }
    type Meal {
        id: ID!
        createdAt: String!
        date: String!
        foodName: String!
        _food: ID!
        username: String!
        _user: ID!
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
    input MealInput {
        createdAt: String!
        date: String!
        foodName: String!
        _food: ID!
        username: String!
        _user: ID!
    }
    type Query {
        getMenus: [Menu]
        getMenu(menuId: ID!): Menu
        getFoods: [Food]
        getFood(foodId: ID!): Food
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createMenu(body: String!): Menu!
        deleteMenu(menuId: ID!): String!
        createMeal(menuId: ID!, meal: MealInput): Menu!
        deleteMeal(menuId: ID!, mealId: ID!): Menu!
        createFood(body: String!): Food!
        deleteFood(foodId: ID!): String!
        createComment(foodId: ID!, body: String!): Food!
        deleteComment(foodId: ID!, commentId: ID!): Food!
        likeFood(foodId: ID!): Food!
    }
`;
