import React, { useContext, useState } from "react";
import { Icon, Label, Menu } from "semantic-ui-react";
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
                name="meals"
                active={activeItem === "meals"}
                onClick={handleItemClick}
                as={Link}
                to="/meals"
            >
                <Label color="orange">1</Label>
                <Icon color="olive" name="clipboard list" />
                Meals
            </Menu.Item>
            <Menu.Item
                name="foods"
                active={activeItem === "foods"}
                onClick={handleItemClick}
                as={Link}
                to="/foods"
            >
                <Label color="orange">12</Label>
                <Icon color="olive" name="food" />
                Foods
            </Menu.Item>

            <Menu.Item
                name="orders"
                active={activeItem === "orders"}
                onClick={handleItemClick}
            >
                <Label color="orange">1</Label>
                <Icon color="olive" name="cart" />
                Orders
            </Menu.Item>
        </Menu>
    ) : (
        ""
    );

    return verticalMenu;
}

export default VerticalMenu;
