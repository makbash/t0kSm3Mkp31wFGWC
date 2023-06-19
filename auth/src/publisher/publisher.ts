import amqp, { Connection } from 'amqplib/callback_api'

import { ConfigType } from '../configs'

const createMQPublisher = (config: ConfigType) => {
  console.log('Publisher connecting to RabbitMQ...')
  let ch: any
  const queue = config.AUTH_TO_USER_QUEUE
  amqp.connect(config.AMQP_URL, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error publisher connecting to RabbitMQ: ', errorConnect)
      return
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel)
        return
      }

      ch = channel
      console.log('Publisher connected to RabbitMQ')
    })
  })
  return (msg: string) => {
    console.log('Publishing message to RabbitMQ...')
    ch.sendToQueue(queue, Buffer.from(msg))
  }
}

export default createMQPublisher
