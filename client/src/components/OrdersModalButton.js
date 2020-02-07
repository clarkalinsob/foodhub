import React, { useState } from 'react'
import moment from 'moment'
import { Button, Header, Icon, Image, Message, Modal, Table } from 'semantic-ui-react'

function OrdersModalButton({ mealDate: { date, orders } }) {
  const [modalOpen, setModalOpen] = useState(false)

  function modalClose() {
    setModalOpen(false)
  }

  return (
    <>
      <Button as='div' color='blue' floated='right' onClick={() => setModalOpen(true)}>
        <Icon name='eye' style={{ margin: 0 }} />
      </Button>

      <Modal open={modalOpen} onClose={modalClose}>
        <Modal.Header>{moment(date).format('ddd, MMM D, YYYY')}</Modal.Header>
        <Modal.Content image scrolling>
          {orders.length > 0 ? (
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Food</Table.HeaderCell>
                  <Table.HeaderCell>Meal Time</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Image
                          size='mini'
                          circular
                          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        />
                        <Header.Content>
                          {order.displayName}
                          <Header.Subheader>{order.email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{order.foodName}</Table.Cell>
                    <Table.Cell>{order.mealTime}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Message info>
              <Message.Header>There are no available orders.</Message.Header>
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='chevron right' />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default OrdersModalButton
