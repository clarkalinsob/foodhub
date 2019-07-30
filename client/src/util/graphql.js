import gql from "graphql-tag";

// QUERY
export const FETCH_FOODS_QUERY = gql`
    {
        getFoods {
            id
            body
            createdAt
            displayName
            likeCount
            commentCount
            likes {
                displayName
            }
            comments {
                id
                displayName
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
            likeCount
            createdAt
            likes {
                displayName
            }
            commentCount
            comments {
                id
                displayName
                body
                createdAt
            }
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

export const CREATE_FOOD_MUTATION = gql`
    mutation createFood($body: String!) {
        createFood(body: $body) {
            id
            body
            displayName
            likes {
                id
                displayName
                createdAt
            }
            comments {
                id
                body
                displayName
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

export const LIKE_FOOD_MUTATION = gql`
    mutation likeFood($foodId: ID!) {
        likeFood(foodId: $foodId) {
            id
            likes {
                id
                displayName
                createdAt
            }
            likeCount
        }
    }
`;
