import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_FOOD_MUTATION, LIKE_MENU_MUTATION } from "../util/graphql";

function LikeButton({ user, obj: { id, likes, likeCount, __typename } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.displayName === user.displayName)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    let setMutation, variables;

    if (__typename === "Food") {
        variables = {
            foodId: id
        };
        setMutation = LIKE_FOOD_MUTATION;
    }
    if (__typename === "Menu") {
        variables = {
            menuId: id
        };
        setMutation = LIKE_MENU_MUTATION;
    }

    const [likeThis] = useMutation(setMutation, {
        variables
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
        <Button as="div" labelPosition="right" onClick={likeThis}>
            {likeButton}
        </Button>
    );
}

export default LikeButton;
