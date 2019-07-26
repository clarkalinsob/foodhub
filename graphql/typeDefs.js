const gql = require("graphql-tag");

module.exports = gql`
    type Menu {
        id: ID!
        body: String!
        displayName: String!
        meals: [Meal]!
        likes: [Like]!
        _user: ID!
        createdAt: String!
    }
    type Food {
        id: ID!
        body: String!
        displayName: String!
        likes: [Like]!
        comments: [Comment]!
        likeCount: Int!
        commentCount: Int!
        _user: ID!
        createdAt: String!
    }
    type Meal {
        id: ID!
        date: String!
        foodName: String!
        displayName: String!
        _food: ID!
        _user: ID!
        createdAt: String!
    }
    type Comment {
        id: ID!
        displayName: String!
        body: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        displayName: String!
        createdAt: String
    }
    type User {
        id: ID!
        email: String!
        token: String!
        displayName: String!
        createdAt: String!
    }
    input SignupInput {
        givenName: String!
        familyName: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    input MealInput {
        date: String!
        foodName: String!
        displayName: String!
        _food: ID!
        _user: ID!
        createdAt: String!
    }
    type Query {
        getMenus: [Menu]
        getMenu(menuId: ID!): Menu

        getFoods: [Food]
        getFood(foodId: ID!): Food
    }
    type Mutation {
        signup(signupInput: SignupInput): User!
        signupGoogle(token: String!): User!

        signin(email: String!, password: String!): User!
        loginGoogle(token: String!): User!

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
