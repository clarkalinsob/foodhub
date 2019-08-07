import gql from "graphql-tag";

// QUERY
export const FETCH_USERS_QUERY = gql`
    {
        getUsers {
            id
            givenName
            familyName
            displayName
            email
            createdAt
        }
    }
`;

export const FETCH_MEALS_QUERY = gql`
    {
        getMeals {
            id
            body
            displayName
            email
            mealDates {
                id
                date
                menu {
                    id
                    body
                }
                displayName
                email
            }
            likeCount
            likes {
                id
                displayName
                email
            }
            commentCount
            comments {
                id
                displayName
                email
                body
                createdAt
            }
            _user
            createdAt
        }
    }
`;

export const FETCH_MEAL_QUERY = gql`
    query($mealId: ID!) {
        getMeal(mealId: $mealId) {
            id
            body
            displayName
            email
            mealDates {
                id
                date
                menu {
                    id
                    body
                }
                displayName
                email
            }
            likeCount
            likes {
                id
                displayName
                email
            }
            commentCount
            comments {
                id
                displayName
                email
                body
                createdAt
            }
            _user
            createdAt
        }
    }
`;

export const FETCH_FOODS_QUERY = gql`
    {
        getFoods {
            id
            body
            createdAt
            displayName
            email
            likeCount
            commentCount
            likes {
                id
                displayName
                email
            }
            comments {
                id
                displayName
                email
                createdAt
                body
            }
        }
    }
`;

export const FETCH_FOOD_QUERY = gql`
    query($foodId: ID!) {
        getFood(foodId: $foodId) {
            id
            body
            displayName
            email
            likeCount
            likes {
                id
                displayName
                email
            }
            commentCount
            comments {
                id
                displayName
                email
                body
                createdAt
            }
            createdAt
        }
    }
`;

// MUTATIONS
export const SIGNUP_USER = gql`
    mutation signup(
        $givenName: String!
        $familyName: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        signup(
            signupInput: {
                givenName: $givenName
                familyName: $familyName
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export const SIGNUP_GOOGLE = gql`
    mutation signupGoogle($token: String!) {
        signupGoogle(token: $token) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export const SIGNIN_GOOGLE = gql`
    mutation signinGoogle($token: String!) {
        signinGoogle(token: $token) {
            id
            displayName
            email
            createdAt
            token
        }
    }
`;

export const CREATE_MEAL_MUTATION = gql`
    mutation createMeal($body: String!) {
        createMeal(body: $body) {
            id
            body
            displayName
            email
            mealDates {
                id
                date
                menu {
                    id
                    body
                }
                displayName
                email
            }
            likes {
                id
                displayName
                email
            }
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            likeCount
            commentCount
            _user
            createdAt
        }
    }
`;

export const DELETE_MEAL_MUTATION = gql`
    mutation deleteMeal($mealId: ID!) {
        deleteMeal(mealId: $mealId)
    }
`;

export const CREATE_MEALDATE_MUTATION = gql`
    mutation createMealDate($mealId: ID!, $date: String!, $menu: String!) {
        createMealDate(
            mealId: $mealId
            mealDate: { date: $date, menu: $menu }
        ) {
            id
            body
            displayName
            email
            mealDates {
                id
                date
                displayName
                email
                menu {
                    id
                    body
                }
            }
        }
    }
`;

export const DELETE_MEALDATE_MUTATION = gql`
    mutation deleteMealDate($mealId: ID!, $mealDateId: ID!) {
        deleteMealDate(mealId: $mealId, mealDateId: $mealDateId) {
            id
            body
            displayName
            email
            mealDates {
                id
                date
                displayName
                email
                menu {
                    id
                    body
                }
            }
        }
    }
`;

export const CREATE_MEALDATE_ORDER_MUTATION = gql`
    mutation createMealDateOrder(
        $mealId: ID!
        $mealDateId: ID!
        $date: String!
        $foodName: String!
        $mealTime: String!
    ) {
        createMealDateOrder(
            mealId: $mealId
            mealDateId: $mealDateId
            mealDateOrder: {
                date: $date
                foodName: $foodName
                mealTime: $mealTime
            }
        ) {
            id
            body
            displayName
            email
            orders {
                id
                date
                displayName
                email
                foodName
                mealTime
                createdAt
            }
        }
    }
`;

export const CREATE_MEAL_COMMENT_MUTATION = gql`
    mutation createMealComment($mealId: ID!, $body: String!) {
        createMealComment(mealId: $mealId, body: $body) {
            id
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            commentCount
        }
    }
`;

export const DELETE_MEAL_COMMENT_MUTATION = gql`
    mutation deleteMealComment($mealId: ID!, $commentId: ID!) {
        deleteMealComment(mealId: $mealId, commentId: $commentId) {
            id
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            commentCount
        }
    }
`;

export const CREATE_FOOD_MUTATION = gql`
    mutation createFood($body: String!) {
        createFood(body: $body) {
            id
            body
            displayName
            email
            likes {
                id
                displayName
                email
            }
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            likeCount
            commentCount
            _user
            createdAt
        }
    }
`;

export const DELETE_FOOD_MUTATION = gql`
    mutation deleteFood($foodId: ID!) {
        deleteFood(foodId: $foodId)
    }
`;

export const CREATE_FOOD_COMMENT_MUTATION = gql`
    mutation createFoodComment($foodId: ID!, $body: String!) {
        createFoodComment(foodId: $foodId, body: $body) {
            id
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            commentCount
        }
    }
`;

export const DELETE_FOOD_COMMENT_MUTATION = gql`
    mutation deleteFoodComment($foodId: ID!, $commentId: ID!) {
        deleteFoodComment(foodId: $foodId, commentId: $commentId) {
            id
            comments {
                id
                body
                displayName
                email
                createdAt
            }
            commentCount
        }
    }
`;

export const LIKE_MEAL_MUTATION = gql`
    mutation likeMeal($mealId: ID!) {
        likeMeal(mealId: $mealId) {
            id
            likes {
                id
                displayName
                email
            }
            likeCount
        }
    }
`;

export const LIKE_FOOD_MUTATION = gql`
    mutation likeFood($foodId: ID!) {
        likeFood(foodId: $foodId) {
            id
            likes {
                id
                displayName
                email
            }
            likeCount
        }
    }
`;
