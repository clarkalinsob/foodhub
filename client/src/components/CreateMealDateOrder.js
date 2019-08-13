import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Divider, Form, Icon, Message, Radio } from "semantic-ui-react";

import { CREATE_MEALDATE_ORDER_MUTATION } from "../util/graphql";

function CreateMealDateOrder({
    user,
    mealId,
    mealDate: { id, date, menu, orders }
}) {
    const [radioFood, setRadioFood] = useState("");
    const [radioMealtime, setRadioMealtime] = useState("");

    const handleChange = (e, { value }) => setRadioFood(value);
    const handleChangeMealtime = (e, { value }) => setRadioMealtime(value);

    const [createMealDateOrder, { error }] = useMutation(
        CREATE_MEALDATE_ORDER_MUTATION,
        {
            variables: {
                mealId,
                mealDateId: id,
                date,
                foodName: radioFood,
                mealTime: radioMealtime
            },
            update() {}
        }
    );

    const thisOrder = orders.find(o => o.email === user.email);

    return (
        <>
            {thisOrder ? (
                <Message key={thisOrder.id} positive size="small">
                    <Message.Header>
                        <Icon name="food" /> {thisOrder.foodName} <br />{" "}
                        <Icon name="clock" /> {thisOrder.mealTime}
                    </Message.Header>
                </Message>
            ) : (
                <>
                    <Message
                        warning
                        size="small"
                        header="You haven't ordered yet."
                        content="Please select a food and a meal time."
                    />
                    <Form>
                        {menu.map(m => (
                            <Form.Field key={m.id}>
                                <Radio
                                    label={m.body}
                                    name="radioGroup"
                                    value={m.body}
                                    checked={radioFood === m.body}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                        ))}
                    </Form>
                    <Divider />
                    <Form>
                        <Form.Group inline>
                            <Form.Field>
                                <Radio
                                    label="Lunch"
                                    name="radioGroup"
                                    value="Lunch"
                                    checked={radioMealtime === "Lunch"}
                                    onChange={handleChangeMealtime}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label="Dinner"
                                    name="radioGroup"
                                    value="Dinner"
                                    checked={radioMealtime === "Dinner"}
                                    onChange={handleChangeMealtime}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                    <Button fluid color="olive" onClick={createMealDateOrder}>
                        Order
                    </Button>
                    {error && (
                        <div
                            className="ui error message"
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <div className="content">
                                <ul className="list">
                                    <li>{error.graphQLErrors[0].message}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default CreateMealDateOrder;
