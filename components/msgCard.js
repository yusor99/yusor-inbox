import { useRouter } from "next/router";
import { apiRetrieve } from "../pages/api";
import { useState } from "react";
import moment from 'moment';
const MsgCard = ({ item, onPress }) => {
  var moment = require('moment');
  const dateee =item&& item.createdAt;
  let time= moment(dateee).format('LT');
  let date=moment(dateee).format('M.DD.YYYY');
  const [msgColor, setMsgColor] = useState(item.opened);
  const router = useRouter();
  return (
    <div
      className="MsgCard"
      onClick={() => {
        onPress(item);
        let id = item && item.id;

        apiRetrieve((err, result) => {
          if (err) throw err;
          else {
            console.log("done");
          }
        }, id);
        msgColor == false && setMsgColor(true);
      }}
    >
      <div className="msgBody">
        <div className="left-side">
          {msgColor ? (
            <img src="/mail_2.png" className="msgIcon  open" alt="email" />
          ) : (
            <img src="/Mail-icon.png" className="msgIcon  open" alt="email" />
          )}

          <div>
            <h6 className={`title${msgColor}`}>{item.title}</h6>
            <p className="text">{item.body}</p>
          </div>
        </div>
        <div className="Date">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>
      <div className="hrMsg"></div>
    </div>
  );
};
export default MsgCard;