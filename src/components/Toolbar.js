import React, { Component } from 'react'

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.calculateUnreadMessages()}</span>
            unread message{this.props.calculateUnreadMessages() !== 1 ? 's' : ''}
          </p>

          <button className="btn btn-default" onClick={this.props.onSelectAllMessages}>
            <i className={`fa ${this.props.checkboxLogo()}`}></i>
          </button>

          <button className="btn btn-default" onClick={this.props.onMarkSelectedRead} disabled={this.props.isDisabled()}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.onMarkSelectedUnread} disabled={this.props.isDisabled()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.props.onSelectedApplyLabel} disabled={this.props.isDisabled()}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.props.onSelectedRemoveLabel} disabled={this.props.isDisabled()}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.onDeleteSelected} disabled={this.props.isDisabled()}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar