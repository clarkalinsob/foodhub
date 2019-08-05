const gql = require("graphql-tag");

module.exports = gql`
    type Meal {
        id: ID!
        body: String!
        displayName: String!
        email: String!
        mealDates: [MealDate]!
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
    type MealDate {
        id: ID!
        date: String!
        displayName: String!
        email: String!
        menu: [Food]
        orders: [Order]
        _user: ID!
        createdAt: String!
    }
    type Order {
        id: ID!
        date: String!
        displayName: String!
        email: String!
        foodName: String!
        mealName: String!
        mealTime: String!
        _meal: ID!
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
    input FoodInput {
        body: String!
    }
    input MealDateInput {
        date: String!
        menu: String!
    }
    input OrderInput {
        date: String!
        mealTime: String!
        foodName: String!
        _food: ID!
        createdAt: String!
    }
    type Query {
        getMeals: [Meal]
        getMeal(mealId: ID!): Meal

        getFoods: [Food]
        getFood(foodId: ID!): Food
    }
    type Mutation {
        signup(signupInput: SignupInput): User!
        signupGoogle(token: String!): User!

        signin(email: String!, password: String!): User!
        signinGoogle(token: String!): User!

        createMeal(body: String!): Meal!
        deleteMeal(mealId: ID!): String!

        createMealDate(mealId: ID!, mealDate: MealDateInput): Meal!
        deleteMealDate(mealId: ID!, mealDateId: ID!): Meal!

        createFood(body: String!): Food!
        deleteFood(foodId: ID!): String!

        createMealComment(mealId: ID!, body: String!): Meal!
        deleteMealComment(mealId: ID!, commentId: ID!): Meal!

        createFoodComment(foodId: ID!, body: String!): Food!
        deleteFoodComment(foodId: ID!, commentId: ID!): Food!

        likeMeal(mealId: ID!): Meal!
        likeFood(foodId: ID!): Food!
    }
`;
