import gql from "graphql-tag";

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
