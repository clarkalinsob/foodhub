import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    Button,
    Card,
    Dropdown,
    Icon,
    Image,
    Loader,
    Grid
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { CUSTOMER, VENDOR, ADMIN } from "../util/roles";
import { FETCH_USER_QUERY, EDIT_USER_MUTATION } from "../util/graphql";

function UserProfile(props) {
    const userEmail = props.match.params.email;
    const { user } = useContext(AuthContext);
    const [editRole, setEditRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const {
        data: { getUser }
    } = useQuery(FETCH_USER_QUERY, {
        variables: {
            email: userEmail
        }
    });

    const handleChange = (e, { value }) => setSelectedRole(value);

    const [editUser, { error }] = useMutation(EDIT_USER_MUTATION, {
        variables: {
            email: userEmail,
            role: selectedRole
        },
        update() {
            setEditRole(false);
        }
    });

    let userProfileMarkup;
    if (!getUser) userProfileMarkup = <Loader active centered="true" />;
    else {
        const { displayName, email, role } = getUser;
        const options = [
            { key: 1, text: "Customer", value: CUSTOMER },
            { key: 2, text: "Vendor", value: VENDOR },
            { key: 3, text: "Admin", value: ADMIN }
        ];

        userProfileMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size="small"
                            float="right"
                            circular
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{displayName}</Card.Header>

                                {user.role === "Admin" && editRole ? (
                                    <Card.Meta>
                                        <p>Select a role:</p>
                                        <Dropdown
                                            fluid
                                            selection
                                            defaultValue={role}
                                            options={options}
                                            style={{ marginBottom: 5 }}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            primary
                                            fluid
                                            onClick={editUser}
                                        >
                                            Update Role
                                        </Button>
                                        {error && (
                                            <div
                                                className="ui error message"
                                                style={{ marginBottom: 20 }}
                                            >
                                                <div className="content">
                                                    <ul className="list">
                                                        <li>
                                                            {
                                                                error
                                                                    .graphQLErrors[0]
                                                                    .message
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </Card.Meta>
                                ) : user.role === "Admin" ? (
                                    <Card.Meta>
                                        {role}
                                        {"  "}
                                        <Icon
                                            link
                                            name="edit"
                                            floated="right"
                                            onClick={() => setEditRole(true)}
                                        />
                                    </Card.Meta>
                                ) : (
                                    <Card.Meta>{role}</Card.Meta>
                                )}
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name="mail" style={{ marginRight: 5 }} />
                                {email} <br />
                                <Icon name="building" />
                                Department here
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return userProfileMarkup;
}

export default UserProfile;
