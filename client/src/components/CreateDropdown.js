import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

import CreateMenu from "./CreateMenu";
import CreateFood from "./CreateFood";

function CreateDropdown() {
    const [openCreateMenu, setOpenCreateMenu] = useState(false);
    const [openCreateFood, setOpenCreateFood] = useState(false);

    const openMenuModal = () => {
        setOpenCreateMenu(true);
    };

    const openFoodModal = () => {
        setOpenCreateFood(true);
    };

    const close = () => {
        setOpenCreateMenu(false);
        setOpenCreateFood(false);
    };

    const tagOptions = [
        {
            key: "createMenu",
            text: "Create menu",
            value: "Create menu",
            icon: "clipboard list",
            onClick: openMenuModal
        },
        {
            key: "createFood",
            text: "Create food",
            value: "Create food",
            icon: "food",
            onClick: openFoodModal
        }
    ];

    return (
        <>
            <Dropdown
                icon="plus"
                pointing="top right"
                floating
                button
                className="icon"
                style={{
                    padding: "1rem",
                    color: "white",
                    backgroundColor: "#b5cc18"
                }}
            >
                <Dropdown.Menu>
                    <Dropdown.Menu scrolling>
                        {tagOptions.map(option => (
                            <Dropdown.Item key={option.value} {...option} />
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
            <CreateMenu open={openCreateMenu} close={close} />
            <CreateFood open={openCreateFood} close={close} />
        </>
    );
}

export default CreateDropdown;
