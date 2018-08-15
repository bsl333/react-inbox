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
        <Toolbar /> 
        <MessageList messages={this.state.messages} onStarClicked={this.onStarClicked}/>
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
}

export default App;
