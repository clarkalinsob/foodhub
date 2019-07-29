import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
    const { user, signout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="green" attached>
            <Menu.Item
                name={user.displayName}
                active
                onClick={handleItemClick}
                as={Link}
                to="/"
            >
                {user.displayName}
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item
                    name="foods"
                    active={activeItem === "foods"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/foods"
                >
                    Foods
                </Menu.Item>
                <Menu.Item
                    name="signout"
                    onClick={signout}
                    as={Link}
                    to="/signin"
                >
                    Sign out
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="green" attached>
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/"
            >
                Home
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item
                    name="signin"
                    active={activeItem === "signin"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/signin"
                >
                    Sign In
                </Menu.Item>

                <Menu.Item
                    name="signup"
                    active={activeItem === "signup"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/signup"
                >
                    Sign Up
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
    return menuBar;
}

export default MenuBar;
