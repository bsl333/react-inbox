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
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.onSelectAllMessages}>
            <i className="fa fa-check-square-o"></i>
          </button>

          <button className="btn btn-default" onClick={this.props.onMarkSelectedRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.onMarkSelectedUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.props.onSelectedApplyLabel}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.props.onSelectedRemoveLabel}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.onDeleteSelected}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar