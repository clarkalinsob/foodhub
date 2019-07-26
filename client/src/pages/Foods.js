import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

function Foods() {
    const {
        loading,
        data: { getFoods: foods }
    } = useQuery(FETCH_FOOD_QUERY);

    if (foods) {
        console.log(foods);
    }

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Foods</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading foods..</h1>
                ) : (
                    foods &&
                    foods.map(food => (
                        <Grid.Column key={food.id} style={{ marginBottom: 20 }}>
                            <PostCard food={food} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_FOOD_QUERY = gql`
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

export default Foods;
