import React from 'react'
import Message from './Message'

const MessageList = ({ messages, onStarClicked, onCheckboxClicked }) => (
  <div>
    { messages.map(message => <Message key={message.id} {...message} onStarClicked={onStarClicked} onCheckboxClicked={onCheckboxClicked}/>) }
  </div>
)
export default MessageList