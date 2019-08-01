const gql = require("graphql-tag");

module.exports = gql`
    type Menu {
        id: ID!
        body: String!
        displayName: String!
        email: String!
        meals: [Meal]!
        likes: [Like]!
        comments: [Comment]!
        likeCount: Int!
        commentCount: Int!
        _user: ID!
        createdAt: String!
    }
    type Food {
        id: ID!
        body: String!
        displayName: String!
        email: String!
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
        email: String!
        _food: ID!
        _user: ID!
        createdAt: String!
    }
    type Comment {
        id: ID!
        displayName: String!
        email: String!
        body: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        displayName: String!
        email: String!
        createdAt: String
    }
    type User {
        id: ID!
        displayName: String!
        email: String!
        token: String!
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
        email: String!
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
        signinGoogle(token: String!): User!

        createMenu(body: String!): Menu!
        deleteMenu(menuId: ID!): String!

        createMeal(menuId: ID!, meal: MealInput): Menu!
        deleteMeal(menuId: ID!, mealId: ID!): Menu!

        createFood(body: String!): Food!
        deleteFood(foodId: ID!): String!

        createMenuComment(menuId: ID!, body: String!): Menu!
        deleteMenuComment(menuId: ID!, commentId: ID!): Menu!

        createFoodComment(foodId: ID!, body: String!): Food!
        deleteFoodComment(foodId: ID!, commentId: ID!): Food!

        likeMenu(menuId: ID!): Menu!
        likeFood(foodId: ID!): Food!
    }
`;
