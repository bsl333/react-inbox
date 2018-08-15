import React from 'react'
import Label from './Label'

const Message = ({ id, subject, read, starred, labels, onStarClicked }) => {
  let isRead = read ? 'read' : 'unread'
  // ADD SELECTED MESSAGES HERE
  // let isSelected = selected ? 'selected' : ''
  let isStarred = starred ? 'fa-star' : 'fa-star-o'
  

  return (
    <div className={`row message ${isRead} `}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked="checked"/>
          </div>
          <div className="col-xs-2" onClick={() => onStarClicked(id)}>
            <i className={`star fa ${isStarred}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(label => <Label key={label} label={label}/>)}
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}

export default Message  