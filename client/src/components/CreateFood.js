import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_MEALS_QUERY, FETCH_FOODS_QUERY, CREATE_FOOD_MUTATION } from '../util/graphql'

function CreateFood({ open, close }) {
  const meals = useQuery(FETCH_MEALS_QUERY)

  const { onChange, onSubmit, values } = useForm(createFoodCallback, {
    body: ''
  })

  const [createFood, { error }] = useMutation(CREATE_FOOD_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_FOODS_QUERY
      })

      data.getFoods = [result.data.createFood, ...data.getFoods]
      proxy.writeQuery({ query: FETCH_FOODS_QUERY, data })
      values.body = ''
      close()
    }
  })

  function createFoodCallback() {
    createFood()
  }

  return (
    <>
      <Modal size='mini' open={open} onClose={close} centered={false}>
        <Modal.Header>Create Food</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Form.Input
                placeholder='e.g., Fried Chicken'
                name='body'
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button type='submit' color='orange' onClick={close}>
                Cancel
              </Button>
              <Button type='submit' color='olive'>
                Create
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <div className='ui error message' style={{ marginBottom: 20 }}>
              <div className='content'>
                <ul className='list'>
                  <li>{error.graphQLErrors[0].message}</li>
                </ul>
              </div>
            </div>
          )}
        </Modal.Content>
      </Modal>
    </>
  )
}

export default CreateFood
