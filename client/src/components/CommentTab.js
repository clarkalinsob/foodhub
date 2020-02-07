import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { Card, Form, Icon, Message, Segment, Transition } from 'semantic-ui-react'

import { CREATE_MEAL_COMMENT_MUTATION } from '../util/graphql'
import DeleteButton from '../components/DeleteButton'

function CommentTab({ user, mealId, comments, typename }) {
  const [comment, setComment] = useState('')

  const [createComment] = useMutation(CREATE_MEAL_COMMENT_MUTATION, {
    variables: {
      mealId,
      body: comment
    },
    update() {
      setComment('')
    }
  })

  return (
    <>
      {user && (
        <Segment basic>
          <Form>
            <div className='ui action input fluid'>
              <input
                type='text'
                placeholder='Post a comment here...'
                name='comment'
                value={comment}
                onChange={event => setComment(event.target.value)}
              />
              <button
                type='submit'
                className='ui button olive'
                disabled={comment.trim() === ''}
                onClick={createComment}
              >
                Comment
              </button>
            </div>
          </Form>
        </Segment>
      )}
      <Segment basic style={{ overflow: 'auto', maxHeight: 500 }}>
        {comments.length > 0 ? (
          <Transition.Group>
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.email === comment.email && (
                    <DeleteButton mealId={mealId} commentId={comment.id} typename={typename} />
                  )}
                  <Card.Header>{comment.displayName}</Card.Header>
                  <Card.Meta>
                    <Icon
                      name='clock outline'
                      style={{
                        marginRight: 5
                      }}
                    />
                    {moment(comment.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Transition.Group>
        ) : (
          <Message info floating>
            <Message.Header>There are no available comments.</Message.Header>
            <p>Post a comment now.</p>
          </Message>
        )}
      </Segment>
    </>
  )
}

export default CommentTab
