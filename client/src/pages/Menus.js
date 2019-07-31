import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Loader, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_MENUS_QUERY } from "../util/graphql";
import MenuCard from "../components/MenuCard";

function Menus() {
    const { user } = useContext(AuthContext);

    const {
        loading,
        data: { getMenus: menus }
    } = useQuery(FETCH_MENUS_QUERY);

    return (
        <Grid columns={1}>
            <Grid.Row>
                {user && <Grid.Column>{/* <Postmenu /> */}</Grid.Column>}
                {loading ? (
                    <Loader active centered />
                ) : (
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
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Menus;
