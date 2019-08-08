import React, { useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import ProfileDropdown from "./ProfileDropdown";
import CreateDropdown from "./CreateDropdown";

function MenuBar() {
    const { user, signout } = useContext(AuthContext);

    const menuBar = user ? (
        <Menu
            size="massive"
            color="orange"
            inverted
            borderless
            style={{ borderRadius: 0, marginBottom: "4rem" }}
        >
            <Menu.Item name="home" as={Link} to="/">
                LOGO
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    {user.role === "Admin" && <CreateDropdown />}
                    <ProfileDropdown signout={signout} user={user} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu
            size="massive"
            color="blue"
            inverted
            borderless
            style={{ borderRadius: 0, marginBottom: "4rem" }}
        >
            <Menu.Item name="home" as={Link} to="/">
                LOGO
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <Button
                        name="signin"
                        color="blue"
                        as={Link}
                        to="/signin"
                        style={{ marginRight: 10 }}
                    >
                        Sign In
                    </Button>
                    <Button name="signup" color="green" as={Link} to="/signup">
                        Sign Up
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
    return menuBar;
}

export default MenuBar;
