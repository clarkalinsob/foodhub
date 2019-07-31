import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Modal } from "semantic-ui-react";

import { FETCH_FOODS_QUERY, DELETE_FOOD_MUTATION } from "../util/graphql";

function DeleteButton({ foodId, callback }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteFood] = useMutation(DELETE_FOOD_MUTATION, {
        variables: {
            foodId
        },
        update(proxy) {
            setModalOpen(false);
            const data = proxy.readQuery({
                query: FETCH_FOODS_QUERY
            });
            data.getFoods = data.getFoods.filter(f => f.id !== foodId);
            proxy.writeQuery({ query: FETCH_FOODS_QUERY, data });

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
                        onClick: deleteFood
                    }
                ]}
            />
        </>
    );
}

export default DeleteButton;
