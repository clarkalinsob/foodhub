import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Modal } from "semantic-ui-react";

import {
    FETCH_MENUS_QUERY,
    FETCH_FOODS_QUERY,
    DELETE_MENU_MUTATION,
    DELETE_MENU_COMMENT_MUTATION,
    DELETE_FOOD_MUTATION,
    DELETE_FOOD_COMMENT_MUTATION
} from "../util/graphql";

function DeleteButton({ menuId, foodId, commentId, typename, callback }) {
    const [modalOpen, setModalOpen] = useState(false);

    const mutation =
        commentId && typename
            ? typename === "Food"
                ? DELETE_FOOD_COMMENT_MUTATION
                : DELETE_MENU_COMMENT_MUTATION
            : foodId
            ? DELETE_FOOD_MUTATION
            : DELETE_MENU_MUTATION;

    const [deleteMutation] = useMutation(mutation, {
        variables: {
            foodId,
            menuId,
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
                        query: FETCH_MENUS_QUERY
                    });
                    data.getMenus = data.getMenus.filter(
                        menu => menu.id !== menuId
                    );
                    proxy.writeQuery({ query: FETCH_MENUS_QUERY, data });
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
                header="Delete food"
                content="Are you sure to delete this food?"
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
