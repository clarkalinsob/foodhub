import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Loader, Message, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_MEALS_QUERY } from "../util/graphql";
import MealCard from "../components/MealCard";

function Meals() {
    const { user } = useContext(AuthContext);

    const {
        loading,
        data: { getMeals: meals }
    } = useQuery(FETCH_MEALS_QUERY);

    return (
        <Grid columns={1}>
            <Grid.Row>
                {loading ? (
                    <Loader active centered="true" />
                ) : meals.length > 0 ? (
                    <Transition.Group>
                        {meals &&
                            meals.map(meal => (
                                <Grid.Column
                                    key={meal.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <MealCard meal={meal} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                ) : (
                    <Grid.Column>
                        <Message info floating>
                            <Message.Header>
                                There are no available meals listed.
                            </Message.Header>
                            <p>
                                Click the + button on the navigation bar to
                                create a meal.
                            </p>
                        </Message>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Meals;
