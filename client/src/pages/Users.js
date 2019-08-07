import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
    Grid,
    Icon,
    Image,
    List,
    Loader,
    Message,
    Transition
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_USERS_QUERY } from "../util/graphql";

function Users() {
    const { user } = useContext(AuthContext);

    const {
        loading,
        data: { getUsers: users }
    } = useQuery(FETCH_USERS_QUERY);

    return (
        <Grid columns={1}>
            <Grid.Row>
                {loading ? (
                    <Loader active centered="true" />
                ) : users.length > 0 ? (
                    <Transition.Group>
                        <Grid.Column style={{ marginBottom: 20 }}>
                            <List
                                animated
                                verticalAlign="middle"
                                celled
                                ordered
                            >
                                {users &&
                                    users.map(user => (
                                        <List.Item
                                            key={user.id}
                                            as={Link}
                                            to={`/users/${user.id}`}
                                        >
                                            <Image
                                                avatar
                                                src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
                                            />
                                            <List.Content>
                                                <List.Header>
                                                    {user.displayName}
                                                </List.Header>
                                                <Icon
                                                    name="mail"
                                                    color="blue"
                                                />
                                                {user.email}
                                            </List.Content>
                                        </List.Item>
                                    ))}
                            </List>
                        </Grid.Column>
                    </Transition.Group>
                ) : (
                    <Grid.Column>
                        <Message info floating>
                            <Message.Header>
                                There are no available users listed.
                            </Message.Header>
                        </Message>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Users;
