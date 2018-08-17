import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

// React Comps
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'
import ComposeMessage from './components/ComposeMessage'

// Message data
import messages from './data.json';
const apiUrl = `http://localhost:8082/api`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages,
      showForm: false
    }
  }

  render() {
    return (
      <div className="container">
        <Toolbar {...this.toolbarActions} toggleShowComposeMessage={this.toggleShowComposeMessage} />
        {this.state.showForm ? <ComposeMessage sendMessage={this.sendMessage}/> : <span></span>}
        <MessageList messages={this.state.messages} onStarClicked={this.onStarClicked} onCheckboxClicked={this.onCheckboxClicked} />
      </div>
    );
  }

  toggleShowComposeMessage = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  sendMessage = async (e) => {
    e.preventDefault()
    const subject = e.target.subject.value
    const body = e.target.body.value
    try {
      await axios.post(`${apiUrl}/messages`, {subject, body})
    } catch (e) {
      console.error(e)  
    } finally {
      await this.getMessages()
    }
  }


  componentDidMount() {
    this.getMessages()
  }

  getMessages = async () => {
    try {
      const messagesResp = await axios.get(`${apiUrl}/messages`)
      const messages = messagesResp.data
      this.setState({
        messages
      })
      // this.setState(prevState => {
      //   const updatedMessages = messages.map(message => {
      //     message.selected = prevState.messages.find(prevMes => prevMes.id === message.id).selected
      //     return message
      //   })
      //   return {
      //     messages: updatedMessages
      //   }
      // })
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
      await axios.patch(`${apiUrl}/messages`, { messageIds, command: 'delete' })
    } catch (e) {
      console.error(e)
    } finally {
      await this.getMessages()
    }
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
