import React, { Component } from 'react';
import './App.css';

// React Comps
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'

// Message data
import messages from './data.json';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages
    }
  }
  render() {
    return (
      <div className="container">
        <Toolbar {...this.toolbarActions} />
        <MessageList messages={this.state.messages} onStarClicked={this.onStarClicked} onCheckboxClicked={this.onCheckboxClicked} />
      </div>
    );
  }

  onStarClicked = (id) => {
    const updatedMessages = this.state.messages.map(message => {
      if (message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({
      messages: updatedMessages
    })
  }

  onCheckboxClicked = (id) => {
    const updateMessages = this.state.messages.map(message => {
      if (message.id === id) message.selected = !message.selected
      return message
    })
    this.setState({
      messages: updateMessages
    })
  }

  onSelectAllMessages = () => {
    if (this.state.messages.every(message => message.selected)) {
      this.setState({
        messages: this.state.messages.map(message => {
          message.selected = false
          return message
        })
      })
    } else {
      this.setState({
        messages: this.state.messages.map(message => {
          message.selected = true
          return message
        })
      })
    }
  }

  onDeleteSelected = () => {
    this.setState({
      messages: this.state.messages.filter(message => !message.selected)
    })
  }

  onMarkSelectedRead = () => {
    this.setState({
      messages: this.state.messages.map(message => {
        message.read = message.selected ? true : message.read
        return message
      })
    })
  }

  onMarkSelectedUnread = () => {
    this.setState({
      messages: this.state.messages.map(message => {
        message.read = message.selected ? false : message.read
        return message
      })
    })
  }

  onSelectedApplyLabel = (e) => {
    const label = e.target.value
    console.log(e.target)
    
    // if (label === 'Apply label') return

    const updatedMessages = this.state.messages.map(message => {
      if (message.selected && !message.labels.includes(label)) {
        message.labels = [...message.labels, label]
      }
      return message
    })

    this.setState({
      messages: updatedMessages
    })
  }

  onSelectedRemoveLabel = (e) => {
    const label = e.target.value
    const updatedMessages = this.state.messages.map(message => {
      if (message.selected && message.labels.includes(label)) {
        message.labels = message.labels.filter(val => val !== label)
      }
      return message
    })

    this.setState({
      messages: updatedMessages
    })
  }

  calculateUnreadMessages = () => {
    return this.state.messages.reduce((acc, mes) => !mes.read ? ++acc: acc, 0)
  }

  setCheckBoxLogo = () => {
    if (this.state.messages.every(message => message.selected)) return 'fa-check-square-o'
    if (this.state.messages.every(message => !message.selected)) return 'fa-square-o'
    else return 'fa-minus-square-o'
  }


  toolbarActions = {
    onDeleteSelected: this.onDeleteSelected,
    onSelectAllMessages: this.onSelectAllMessages,
    onMarkSelectedRead: this.onMarkSelectedRead,
    onMarkSelectedUnread: this.onMarkSelectedUnread,
    onSelectedApplyLabel: this.onSelectedApplyLabel,
    onSelectedRemoveLabel: this.onSelectedRemoveLabel,
    calculateUnreadMessages: this.calculateUnreadMessages,
    setCheckBoxLogo: this.setCheckBoxLogo
  }
}

export default App;
