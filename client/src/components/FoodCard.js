import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function FoodCard({
  food: { body, createdAt, id, displayName, email, likeCount, commentCount, likes, __typename }
}) {
  const { user } = useContext(AuthContext)

  function commentOnFood() {
    console.log('comment on food!')
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          circular
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header as={Link} to={`/foods/${id}`}>
          {body}
        </Card.Header>
        <Card.Meta>
          <Icon name='user outline' style={{ marginRight: 5 }} />
          {displayName}
        </Card.Meta>
        <Card.Meta>
          <Icon name='clock outline' style={{ marginRight: 5 }} />
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} obj={{ id, likes, likeCount, __typename }} />
        <Button labelPosition='right' as={Link} to={`/foods/${id}`}>
          <Button basic color='orange'>
            <Icon name='comments' style={{ margin: 0 }} />
          </Button>
          <Label color='orange' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.email === email && <DeleteButton foodId={id} />}
      </Card.Content>
    </Card>
  )
}

export default FoodCard
