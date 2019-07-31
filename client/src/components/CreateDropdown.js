import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

import PostFood from "./PostFood";

function CreateDropdown() {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };

    const tagOptions = [
        {
            key: "createMenu",
            text: "Create menu",
            value: "Create menu",
            icon: "clipboard list"
        },
        {
            key: "createFood",
            text: "Create food",
            value: "Create food",
            icon: "food",
            onClick: openModal
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
            <PostFood open={open} close={close} />
        </>
    );
}

export default CreateDropdown;
