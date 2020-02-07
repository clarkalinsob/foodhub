import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Button,
  Card,
  Grid,
  Icon,
  Image,
  Label,
  Loader,
  Menu,
  Tab,
  Transition,
  Divider
} from 'semantic-ui-react'

import { FETCH_MEAL_QUERY, FETCH_FOODS_QUERY } from '../util/graphql'
import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import CommentTab from '../components/CommentTab'
import CreateMealDate from '../components/CreateMealDate'
import CreateMealDateOrder from '../components/CreateMealDateOrder'
import OrdersModalButton from '../components/OrdersModalButton'

function SingleMeal(props) {
  const mealId = props.match.params.mealId
  const { user } = useContext(AuthContext)
  const {
    data: { getMeal }
  } = useQuery(FETCH_MEAL_QUERY, {
    variables: {
      mealId
    }
  })
  const {
    data: { getFoods: foods }
  } = useQuery(FETCH_FOODS_QUERY)

  function getFoodList() {
    let arr = []
    foods.forEach(food => {
      const obj = { key: food.id, value: food.body, text: food.body }
      arr.push(obj)
    })

    return arr
  }

  function deleteMealCallback() {
    props.history.push('/meals')
  }

  let mealMarkup
  if (!getMeal) mealMarkup = <Loader active centered='true' />
  else {
    const {
      id,
      body,
      displayName,
      email,
      mealDates,
      comments,
      commentCount,
      likes,
      likeCount,
      createdAt,
      __typename
    } = getMeal

    const foodList = getFoodList()

    const panes = [
      {
        menuItem: (
          <Menu.Item key='menus'>
            Menus
            {mealDates.length > 0 && <Label color='orange'>{mealDates.length}</Label>}
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Grid columns={2}>
              <Grid.Row>
                <Transition.Group>
                  {user.role === 'Admin' && (
                    <Grid.Column
                      style={{
                        marginTop: 20,
                        marginBottom: 20
                      }}
                    >
                      <CreateMealDate mealId={mealId} foodList={foodList} />
                    </Grid.Column>
                  )}
                  {mealDates.map(mealDate => (
                    <Grid.Column
                      key={mealDate.id}
                      style={{
                        marginTop: 20,
                        marginBottom: 20
                      }}
                    >
                      <Card fluid key={mealDate.id}>
                        <Card.Content>
                          {user && user.email === mealDate.email && (
                            <>
                              <DeleteButton mealId={id} mealDateId={mealDate.id} />
                            </>
                          )}
                          {user && user.role === 'Admin' && (
                            <OrdersModalButton mealDate={mealDate} />
                          )}
                          <Card.Header>
                            {moment(mealDate.date).format('ddd, MMM D, YYYY')}
                          </Card.Header>
                          <Card.Meta>
                            <Icon
                              name='user outline'
                              style={{
                                marginRight: 5
                              }}
                            />
                            {mealDate.displayName}
                          </Card.Meta>
                          <Card.Meta>
                            <Icon
                              name='clock outline'
                              style={{
                                marginRight: 5
                              }}
                            />
                            {moment(mealDate.createdAt).fromNow(true)}
                          </Card.Meta>
                          <Divider />
                          <CreateMealDateOrder user={user} mealId={mealId} mealDate={mealDate} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))}
                </Transition.Group>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item key='comments'>
            Comments
            {comments.length > 0 && <Label color='orange'>{commentCount}</Label>}
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <CommentTab user={user} mealId={id} comments={comments} typename={__typename} />
          </Tab.Pane>
        )
      }
    ]

    mealMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size='small'
              float='right'
              circular
              src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
            />
          </Grid.Column>
          <Grid.Column width={14}>
            <Card fluid>
              <Card.Content>
                <Card.Header as={Link} to={`/meals/${id}`}>
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
                <LikeButton
                  user={user}
                  obj={{
                    id,
                    likeCount,
                    likes,
                    __typename
                  }}
                />
                <Button as='div' labelPosition='right'>
                  <Button color='orange' basic>
                    <Icon name='comments' style={{ margin: 0 }} />
                  </Button>
                  <Label color='orange' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && user.email === email && (
                  <DeleteButton mealId={id} callback={deleteMealCallback} />
                )}
              </Card.Content>
            </Card>
            <Tab panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return mealMarkup
}

export default SingleMeal
