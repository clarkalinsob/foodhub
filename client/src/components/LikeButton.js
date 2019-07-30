import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_FOOD_MUTATION } from "../util/graphql";

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
            <>
                <Button color="blue">
                    <Icon name="thumbs up" style={{ margin: 0 }} />
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                    {likeCount}
                </Label>
            </>
        ) : (
            <>
                <Button color="blue" basic>
                    <Icon name="thumbs up" style={{ margin: 0 }} />
                </Button>
                <Label as="a" color="blue" pointing="left">
                    {likeCount}
                </Label>
            </>
        )
    ) : (
        <Button as={Link} to="/signin" color="blue" basic>
            <Icon name="thumbs up" style={{ margin: 0 }} />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={likeFood}>
            {likeButton}
        </Button>
    );
}

export default LikeButton;
