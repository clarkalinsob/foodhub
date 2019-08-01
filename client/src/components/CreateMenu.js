import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import {
    FETCH_MENUS_QUERY,
    FETCH_FOODS_QUERY,
    CREATE_MENU_MUTATION
} from "../util/graphql";

function CreateMenu({ open, close }) {
    const foods = useQuery(FETCH_FOODS_QUERY);

    const { onChange, onSubmit, values } = useForm(createMenuCallback, {
        body: ""
    });

    const [createMenu, { error }] = useMutation(CREATE_MENU_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_MENUS_QUERY
            });

            data.getMenus = [result.data.createMenu, ...data.getMenus];
            proxy.writeQuery({ query: FETCH_MENUS_QUERY, data });
            values.body = "";
            close();
        }
    });

    function createMenuCallback() {
        createMenu();
    }

    return (
        <>
            <Modal size="mini" open={open} onClose={close} centered={false}>
                <Modal.Header>Create Menu</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <Form.Input
                                placeholder="e.g., Menu of the Week"
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

export default CreateMenu;
