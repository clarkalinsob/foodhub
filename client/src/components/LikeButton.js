import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";

function LikeButton({ user, food: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find(like => like.displayName === user.displayName)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likeFood] = useMutation(LIKE_FOOD_MUTATION, {
        variables: { foodId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color="green">
                <Icon name="heart" style={{ margin: 0 }} />
            </Button>
        ) : (
            <Button color="green" basic>
                <Icon name="heart" style={{ margin: 0 }} />
            </Button>
        )
    ) : (
        <Button as={Link} to="/signin" color="green" basic>
            <Icon name="heart" style={{ margin: 0 }} />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={likeFood}>
            {likeButton}
            <Label as="a" basic color="green" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
}

const LIKE_FOOD_MUTATION = gql`
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

export default LikeButton;
