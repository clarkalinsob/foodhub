import gql from "graphql-tag";

// QUERY
export const FETCH_MENUS_QUERY = gql`
    {
        getMenus {
            id
            body
            displayName
            email
            meals {
                date
                foodName
                displayName
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

export const FETCH_MENU_QUERY = gql`
    query($menuId: ID!) {
        getMenu(menuId: $menuId) {
            id
            body
            displayName
            email
            meals {
                date
                foodName
                displayName
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

export const CREATE_MENU_MUTATION = gql`
    mutation createMenu($body: String!) {
        createMenu(body: $body) {
            id
            body
            displayName
            email
            meals {
                date
                foodName
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

export const DELETE_MENU_MUTATION = gql`
    mutation deleteMenu($menuId: ID!) {
        deleteMenu(menuId: $menuId)
    }
`;

export const CREATE_MENU_COMMENT_MUTATION = gql`
    mutation createMenuComment($menuId: ID!, $body: String!) {
        createMenuComment(menuId: $menuId, body: $body) {
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

export const DELETE_MENU_COMMENT_MUTATION = gql`
    mutation deleteMenuComment($menuId: ID!, $commentId: ID!) {
        deleteMenuComment(menuId: $menuId, commentId: $commentId) {
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

export const LIKE_MENU_MUTATION = gql`
    mutation likeMenu($menuId: ID!) {
        likeMenu(menuId: $menuId) {
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
