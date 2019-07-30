import React, { useContext, useState } from "react";
import { Label, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function VerticalMenu() {
    const { user } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const verticalMenu = user ? (
        <Menu stackable vertical floated size="large">
            <Menu.Item
                name="menus"
                active={activeItem === "menus"}
                onClick={handleItemClick}
                as={Link}
                to="/menus"
            >
                <Label color="olive">1</Label>
                Menu
            </Menu.Item>
            <Menu.Item
                name="foods"
                active={activeItem === "foods"}
                onClick={handleItemClick}
                as={Link}
                to="/foods"
            >
                <Label color="olive">12</Label>
                Foods
            </Menu.Item>

            <Menu.Item
                name="orders"
                active={activeItem === "orders"}
                onClick={handleItemClick}
            >
                <Label color="olive">1</Label>
                Orders
            </Menu.Item>
        </Menu>
    ) : (
        ""
    );

    return verticalMenu;
}

export default VerticalMenu;
