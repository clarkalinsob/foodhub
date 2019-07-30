import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_FOODS_QUERY, DELETE_FOOD_MUTATION } from "../util/graphql";

function DeleteButton({ foodId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteFood] = useMutation(DELETE_FOOD_MUTATION, {
        variables: {
            foodId
        },
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_FOODS_QUERY
            });
            data.getFoods = data.getFoods.filter(f => f.id !== foodId);
            proxy.writeQuery({ query: FETCH_FOODS_QUERY, data });
            if (callback) callback();
        }
    });

    return (
        <>
            <Button
                as="div"
                color="google plus"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteFood}
            />
        </>
    );
}

export default DeleteButton;
