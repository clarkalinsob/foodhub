import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_FOODS_QUERY } from "../util/graphql";

function PostFood() {
    const { onChange, onSubmit, values } = useForm(createFoodCallback, {
        body: ""
    });

    const [createFood, { error }] = useMutation(CREATE_FOOD_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_FOODS_QUERY
            });
            data.getFoods = [result.data.createFood, ...data.getFoods];
            proxy.writeQuery({ query: FETCH_FOODS_QUERY, data });
            values.body = "";
        }
    });

    function createFoodCallback() {
        createFood();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a food: </h2>
                <br />
                <Form.Field>
                    <Form.Input
                        placeholder="A food"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />

                    <Button type="submit" color="green">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <div className="content">
                        <ul className="list">
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

const CREATE_FOOD_MUTATION = gql`
    mutation createFood($body: String!) {
        createFood(body: $body) {
            id
            body
            displayName
            likes {
                id
                displayName
                createdAt
            }
            comments {
                id
                body
                displayName
                createdAt
            }
            likeCount
            commentCount
            _user
            createdAt
        }
    }
`;

export default PostFood;
