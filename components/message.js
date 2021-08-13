import { useState } from "react";
import { apiDestroy } from "../pages/api";
import moment from 'moment';

const Message = ({ item, onDelete, msgShow1 }) => {
    var moment = require('moment');
  
    const dateee =item&& item.createdAt;
    let time= moment(dateee).format('LT');
    let date=moment(dateee).format('M.DD.YYYY');
  let id = item && item.id;
  const deleteItems = () => {
    apiDestroy((err, result) => {
      if (err) throw err;
      else {
        onDelete(id);
      }
    }, id);
  };

  return (
    <div className={`message${msgShow1}`}>
      <div className="msgContianer">
        <div className="msgHead">
          <span>
            From :<span className="email">{item && item.from}</span>
          </span>
          <span className="msgDate">
            <span>{date}</span>
            <span>{time}</span>
          </span>
        </div>
        <div className="msgBody">{item && item.body}</div>
        <a href={item&&item.uri} className="save">
         {item&&item.uriTitle}
        </a>
        <div className="note">
          <small>Le Lorem Ipsum est simplement du faux texte employé dans la
                composition et la mise en page avant impression. Le Lorem Ipsum
                est le faux texte standard </small>
        </div>
        <div className="hr"></div>
        <button className="msgDelete" onClick={deleteItems}>
          DELETE
        </button>
      </div>
    </div>
  );
};
export default Message;