import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import {
    FETCH_MEALS_QUERY,
    FETCH_FOODS_QUERY,
    CREATE_MEAL_MUTATION
} from "../util/graphql";

function CreateMeal({ open, close }) {
    const foods = useQuery(FETCH_FOODS_QUERY);

    const { onChange, onSubmit, values } = useForm(createMealCallback, {
        body: ""
    });

    const [createMeal, { error }] = useMutation(CREATE_MEAL_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_MEALS_QUERY
            });

            data.getMeals = [result.data.createMeal, ...data.getMeals];
            proxy.writeQuery({ query: FETCH_MEALS_QUERY, data });
            values.body = "";
            close();
        }
    });

    function createMealCallback() {
        createMeal();
    }

    return (
        <>
            <Modal size="mini" open={open} onClose={close} centered={false}>
                <Modal.Header>Create Meal</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <Form.Input
                                placeholder="e.g., Meal of the Week"
                                name="body"
                                onChange={onChange}
                                value={values.body}
                                error={error ? true : false}
                            />
                            <Button
                                type="submit"
                                color="orange"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color="olive">
                                Create
                            </Button>
                        </Form.Field>
                    </Form>
                    {error && (
                        <div
                            className="ui error message"
                            style={{ marginBottom: 20 }}
                        >
                            <div className="content">
                                <ul className="list">
                                    <li>{error.graphQLErrors[0].message}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </Modal.Content>
            </Modal>
        </>
    );
}

export default CreateMeal;
