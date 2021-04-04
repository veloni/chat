import React from 'react';

import './Message.scss';

const Message = ({
  item,
  createPopUp,
}) => (
  <div className="wrapper-message">
    <div 
      id={item.id} 
      className="wrapper-message-text"
      onClick={(e) => createPopUp(e, item.id)}
    >
      <div className="wrapper-nick-message">
        <div className="wrapper-nick-name">
          {item.nickName}
        </div>
        {!item.isImg && <span className="text-in-message">
          {item.message}
        </span>}
        {item.isImg && <img
          className="wrapper-sticker"
          src={item.message}
          alt={"sticker"}
        />}
      </div>
      <div className="wrapper-time-in-message">
        <span className="time-in-message">
          {item.date}
        </span>
      </div>
    </div>
  </div>
);

export default Message; 