import React from 'react'
import Message from './Message'

const MessageList = ({ messages, onStarClicked }) => (
  <div>
    { messages.map(message => <Message key={message.id} {...message} onStarClicked={onStarClicked}/>) }
  </div>
)
export default MessageList