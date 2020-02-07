import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Image, List, Loader, Message, Popup, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { FETCH_USERS_QUERY } from '../util/graphql'
import DeleteButton from '../components/DeleteButton'

function Users() {
  const {
    user: { email, role }
  } = useContext(AuthContext)

  const {
    loading,
    data: { getUsers: users }
  } = useQuery(FETCH_USERS_QUERY)

  return (
    <Grid columns={1}>
      <Grid.Row>
        {loading ? (
          <Loader active centered='true' />
        ) : users.length > 0 ? (
          <Transition.Group>
            <Grid.Column style={{ marginBottom: 20 }}>
              <List animated verticalAlign='middle' celled ordered>
                {users &&
                  users.map(user => (
                    <List.Item key={user.id}>
                      <Popup
                        content={user.email}
                        trigger={
                          <Image
                            avatar
                            src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
                          />
                        }
                      />
                      <List.Content as={Link} to={`/users/${user.email}`}>
                        <List.Header>{user.displayName}</List.Header>
                        {user.role}
                      </List.Content>
                      {user.email !== email ? <DeleteButton /> : ''}
                    </List.Item>
                  ))}
              </List>
            </Grid.Column>
          </Transition.Group>
        ) : (
          <Grid.Column>
            <Message info floating>
              <Message.Header>There are no available users listed.</Message.Header>
            </Message>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Users
