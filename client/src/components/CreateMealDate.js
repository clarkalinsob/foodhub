import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Button, Card, Dropdown } from "semantic-ui-react";

import { CREATE_MEALDATE_MUTATION } from "../util/graphql";

function CreateMealDate({ mealId, foodList }) {
    const [date, setDate] = useState("");
    const [menu, setMenu] = useState({
        value: []
    });

    const handleChange = (e, { value }) => {
        let menuList = [];

        value.forEach(val => {
            const obj = { body: val };

            menuList.push(obj);
        });

        setMenu({ value: menuList });
    };

    const [createMealDate, { error }] = useMutation(CREATE_MEALDATE_MUTATION, {
        variables: {
            mealId,
            date,
            menu: JSON.stringify(menu.value)
        },
        update() {}
    });

    return (
        <Card fluid>
            <Card.Content>
                <p>Date</p>
                <div className="date-picker">
                    <SemanticDatepicker
                        onDateChange={date => {
                            if (date === null) setDate("");
                            else setDate(date);
                        }}
                        clearable
                        format="ddd, MMM D, YYYY"
                        placeholder="Select date"
                    />
                </div>
                <p>Add menu </p>
                <Dropdown
                    fluid
                    clearable
                    multiple
                    search
                    selection
                    options={foodList}
                    placeholder="Select foods"
                    onChange={handleChange}
                    style={{ marginBottom: 10 }}
                />

                <Button fluid color="olive" onClick={createMealDate}>
                    Add
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
            </Card.Content>
        </Card>
    );
}

export default CreateMealDate;
