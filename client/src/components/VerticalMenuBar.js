import React, { useContext, useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function VerticalMenuBar() {
  const { user } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'meals' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const verticalMenuBar = user ? (
    <Menu stackable vertical floated size='large'>
      <Menu.Item
        name='meals'
        active={activeItem === 'meals'}
        onClick={handleItemClick}
        as={Link}
        to='/meals'
      >
        {/* <Label color="orange" /> */}
        <Icon color='olive' name='clipboard list' />
        Meals
      </Menu.Item>
      <Menu.Item
        name='foods'
        active={activeItem === 'foods'}
        onClick={handleItemClick}
        as={Link}
        to='/foods'
      >
        {/* <Label color="orange" /> */}
        <Icon color='olive' name='food' />
        Foods
      </Menu.Item>
      {user.role === 'Admin' && (
        <Menu.Item
          name='users'
          active={activeItem === 'users'}
          onClick={handleItemClick}
          as={Link}
          to='/users'
        >
          {/* <Label color="orange" /> */}
          <Icon color='olive' name='users' />
          Users
        </Menu.Item>
      )}
    </Menu>
  ) : (
    ''
  )

  return verticalMenuBar
}

export default VerticalMenuBar
