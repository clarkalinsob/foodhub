import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Loader, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_FOODS_QUERY } from "../util/graphql";
import FoodCard from "../components/FoodCard";

function Foods() {
    const { user } = useContext(AuthContext);

    const {
        loading,
        data: { getFoods: foods }
    } = useQuery(FETCH_FOODS_QUERY);

    return (
        <Grid columns={2}>
            <Grid.Row>
                {loading ? (
                    <Loader active centered />
                ) : (
                    <Transition.Group>
                        {foods &&
                            foods.map(food => (
                                <Grid.Column
                                    key={food.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <FoodCard food={food} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Foods;
