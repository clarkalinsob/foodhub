import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

import CreateMeal from "./CreateMeal";
import CreateFood from "./CreateFood";

function CreateDropdown() {
    const [openCreateMeal, setOpenCreateMeal] = useState(false);
    const [openCreateFood, setOpenCreateFood] = useState(false);

    const openMealModal = () => {
        setOpenCreateMeal(true);
    };

    const openFoodModal = () => {
        setOpenCreateFood(true);
    };

    const close = () => {
        setOpenCreateMeal(false);
        setOpenCreateFood(false);
    };

    const tagOptions = [
        {
            key: "createMeal",
            text: "Create meal",
            value: "Create meal",
            icon: "clipboard list",
            onClick: openMealModal
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
            <CreateMeal open={openCreateMeal} close={close} />
            <CreateFood open={openCreateFood} close={close} />
        </>
    );
}

export default CreateDropdown;
