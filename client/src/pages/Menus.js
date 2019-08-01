import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Loader, Message, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_MENUS_QUERY } from "../util/graphql";
import MenuCard from "../components/MenuCard";
import Foods from "./Foods";

function Menus() {
    const { user } = useContext(AuthContext);

    const {
        loading,
        data: { getMenus: menus }
    } = useQuery(FETCH_MENUS_QUERY);

    return (
        <Grid columns={1}>
            <Grid.Row>
                {loading ? (
                    <Loader active centered="true" />
                ) : menus.length > 0 ? (
                    <Transition.Group>
                        {menus &&
                            menus.map(menu => (
                                <Grid.Column
                                    key={menu.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <MenuCard menu={menu} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                ) : (
                    <Grid.Column>
                        <Message info floating>
                            <Message.Header>
                                There are no available menus listed.
                            </Message.Header>
                            <p>
                                Click the + button on the navigation bar to
                                create a menu.
                            </p>
                        </Message>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Menus;
