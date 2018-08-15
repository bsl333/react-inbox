import React from 'react'
import Label from './Label'

const Message = ({ id, subject, read, starred, labels, selected, onStarClicked, onCheckboxClicked }) => {
  let isRead = read ? 'read' : 'unread'
  // ADD SELECTED MESSAGES HERE
  let isStarred = starred ? 'fa-star' : 'fa-star-o'
  let isSelected = selected ? 'selected' : ''
  let isChecked = selected ? 'checked' : ''
  

  return (
    <div className={`row message ${isRead} ${isSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={() => onCheckboxClicked(id)}/>
          </div>
          <div className="col-xs-2" onClick={() => onStarClicked(id)}>
            <i className={`star fa ${isStarred}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map((label,i) => <Label key={i} label={label}/>)}
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}

export default Message  