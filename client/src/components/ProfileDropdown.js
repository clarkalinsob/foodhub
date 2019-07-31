import React from "react";
import { Dropdown, Image } from "semantic-ui-react";

function ProfileDropdown({ signout, user: { displayName } }) {
    const trigger = (
        <span>
            <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
        </span>
    );

    const options = [
        {
            key: "user",
            text: (
                <span>
                    <strong>{displayName}</strong>
                </span>
            ),
            disabled: true
        },
        {
            key: "sign-out",
            text: "Sign Out",
            icon: "sign out",
            onClick: signout
        }
    ];

    return (
        <Dropdown
            trigger={trigger}
            options={options}
            pointing="top right"
            floating
            icon={null}
        />
    );
}

export default ProfileDropdown;
