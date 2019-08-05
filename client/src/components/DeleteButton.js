import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Modal } from "semantic-ui-react";

import {
    FETCH_MEALS_QUERY,
    FETCH_FOODS_QUERY,
    DELETE_MEAL_MUTATION,
    DELETE_MEAL_COMMENT_MUTATION,
    DELETE_FOOD_MUTATION,
    DELETE_FOOD_COMMENT_MUTATION
} from "../util/graphql";
import { type } from "os";

function DeleteButton({ mealId, foodId, commentId, typename, callback }) {
    const [modalOpen, setModalOpen] = useState(false);

    const mutation =
        commentId && typename
            ? typename === "Food"
                ? DELETE_FOOD_COMMENT_MUTATION
                : DELETE_MEAL_COMMENT_MUTATION
            : foodId
            ? DELETE_FOOD_MUTATION
            : DELETE_MEAL_MUTATION;

    const [deleteMutation] = useMutation(mutation, {
        variables: {
            foodId,
            mealId,
            commentId
        },
        update(proxy) {
            setModalOpen(false);
            if (!commentId) {
                if (foodId) {
                    const data = proxy.readQuery({
                        query: FETCH_FOODS_QUERY
                    });
                    data.getFoods = data.getFoods.filter(
                        food => food.id !== foodId
                    );
                    proxy.writeQuery({ query: FETCH_FOODS_QUERY, data });
                } else {
                    const data = proxy.readQuery({
                        query: FETCH_MEALS_QUERY
                    });
                    data.getMeals = data.getMeals.filter(
                        meal => meal.id !== mealId
                    );
                    proxy.writeQuery({ query: FETCH_MEALS_QUERY, data });
                }
            }
            if (callback) callback();
        }
    });

    function modalClose() {
        setModalOpen(false);
    }

    return (
        <>
            <Button
                as="div"
                color="google plus"
                floated="right"
                onClick={() => setModalOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>

            <Modal
                centered={false}
                size="mini"
                open={modalOpen}
                onClose={modalClose}
                header="Delete"
                content="Are you sure you want to delete this?"
                actions={[
                    {
                        key: "cancel",
                        content: "Cancel",
                        color: "orange",
                        onClick: modalClose
                    },
                    {
                        key: "delete",
                        content: "Delete",
                        color: "olive",
                        onClick: deleteMutation
                    }
                ]}
            />
        </>
    );
}

export default DeleteButton;
