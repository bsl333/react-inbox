import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

// React Comps
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'

// Message data
import messages from './data.json';
const apiUrl = `http://localhost:8082/api`

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


  componentDidMount() {
    this.getMessages()
  }

  getMessages = async () => {
    try {
      const messagesResp = await axios.get(`${apiUrl}/messages`)
      const messages = messagesResp.data
      this.setState(prevState => {
        const updatedMessages = messages.map(message => {
          message.selected = prevState.messages.find(prevMes => prevMes.id === message.id).selected
          return message
        })
        return {
          messages: updatedMessages
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  onStarClicked = async (id) => {
    try {
      await axios.patch(`${apiUrl}/messages`, { messageIds: [id], command: 'star' })
    } catch (e) {
      console.error(e)
    } finally {
      this.getMessages()
    }
  }

  onCheckboxClicked = async (id) => {
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

  onDeleteSelected = async () => {
    try {
      const messageIds = this.getSelectedMessagesIds()
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'delete'})
    } catch (e) {
      console.error(e)
    } finally {
      await this.getMessages()
    }
    
    // this.setState({
    //   messages: this.state.messages.filter(message => !message.selected)
    // })
  }

  onMarkSelectedRead = async () => {
    try {
      const messageIds = this.getSelectedMessagesIds()
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'read', read: true })
    } catch (e) {
      console.error(e)
    } finally {
      await this.getMessages()
    }

    // this.setState({
    //   messages: this.state.messages.map(message => {
    //     message.read = message.selected ? true : message.read
    //     return message
    //   })
    // })
  }

  onMarkSelectedUnread = async () => {
    try {
      const messageIds = this.getSelectedMessagesIds()
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'read', read: false })
    } catch (e) {
      console.error(e)
    } finally {
      this.getMessages()
    }

    // this.setState({
    //   messages: this.state.messages.map(message => {
    //     message.read = message.selected ? false : message.read
    //     return message
    //   })
    // })
  }

  onSelectedApplyLabel = async (e) => {
    try {
      const label = e.target.value
      if (label === 'Apply label') return 
      const messageIds = this.getSelectedMessagesIds()
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'addLabel', label })
    } catch (e) {
      console.error(e)
    } finally {
      await this.getMessages()
    }
    // const label = e.target.value
    // if (label === 'Apply label') return

    // const updatedMessages = this.state.messages.map(message => {
    //   if (message.selected && !message.labels.includes(label)) {
    //     message.labels = [...message.labels, label]
    //   }
    //   return message
    // })

    // this.setState({
    //   messages: updatedMessages
    // })
  }

  onSelectedRemoveLabel = async (e) => {
    try {
      const label = e.target.value
      const messageIds = this.getSelectedMessagesIds()
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'removeLabel', label })
    } catch (e) {
      console.error(e)
    } finally {
      await this.getMessages()
    }
    // const label = e.target.value
    // const updatedMessages = this.state.messages.map(message => {
    //   if (message.selected && message.labels.includes(label)) {
    //     message.labels = message.labels.filter(val => val !== label)
    //   }
    //   return message
    // })

    // this.setState({
    //   messages: updatedMessages
    // })
  }

  calculateUnreadMessages = () => {
    return this.state.messages.reduce((acc, mes) => !mes.read ? ++acc : acc, 0)
  }

  setCheckBoxLogo = () => {
    if (this.state.messages.every(message => message.selected)) return 'fa-check-square-o'
    if (this.state.messages.every(message => !message.selected)) return 'fa-square-o'
    else return 'fa-minus-square-o'
  }

  noMessagesSelected = () => {
    return this.state.messages.every(message => !message.selected)
  }

  getSelectedMessagesIds() {
    return this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)
  }


  toolbarActions = {
    onDeleteSelected: this.onDeleteSelected,
    onSelectAllMessages: this.onSelectAllMessages,
    onMarkSelectedRead: this.onMarkSelectedRead,
    onMarkSelectedUnread: this.onMarkSelectedUnread,
    onSelectedApplyLabel: this.onSelectedApplyLabel,
    onSelectedRemoveLabel: this.onSelectedRemoveLabel,
    calculateUnreadMessages: this.calculateUnreadMessages,
    checkboxLogo: this.setCheckBoxLogo,
    isDisabled: this.noMessagesSelected
  }
}

export default App;
