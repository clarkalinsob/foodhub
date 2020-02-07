import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ProfileDropdown({ signout, user: { displayName, email } }) {
  const trigger = (
    <span>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
    </span>
  )

  return (
    <Dropdown trigger={trigger} pointing='top right' floating icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text={displayName} disabled />
        <Dropdown.Item as={Link} to={`/users/${email}`} icon='user' text='Profile' />
        <Dropdown.Item icon='sign out' text='Sign out' onClick={signout} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileDropdown
